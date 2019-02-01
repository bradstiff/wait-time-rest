import React from 'react';
import PropTypes from 'prop-types';
import PinchZoomPan from 'react-responsive-pinch-zoom-pan';

import ComicBubbles from '../comicbubbles/comicbubbles';
import ModalCircularProgress from '../common/ModalCircularProgress';
import { WaitTimeDateShape } from './types';
import { getBubbleDefinitions } from '../store/liftBubbleDefinitions';

//trailMapFilename is passed as key. Component auto-remounts when navigating to next resort.
//Avoids the need to use getDerivedStateFromProps to cause next resort's trail map to load.
class WaitTimeMap extends React.Component {
    static propTypes = {
        trailMapFilename: PropTypes.string,
        waitTimeDate: WaitTimeDateShape,
    };

    state = {
        trailMapLoaded: false,
    };

    setCanvas = ref => {
        this.canvas = ref;
    }

    componentDidMount() {
        this.loadTrailMap();
        this.tryDrawCanvas();
    }

    componentDidUpdate() {
        this.tryDrawCanvas();
    }

    componentWillUnmount() {
        if (this.image) {
            this.image.onload = () => { };
            delete this.image;
        }
    }

    loadTrailMap() {
        const { trailMapFilename } = this.props;
        if (!trailMapFilename) {
            //filename not yet known
            return;
        }

        if (this.image) {
            //already loading / loaded
            return;
        }

        this.image = new Image();
        this.image.addEventListener("load", this.handleTrailMapLoaded);
        this.image.src = `${process.env.PUBLIC_URL}/trailmaps/${trailMapFilename}`;
        this.image.alt = 'Trail Map';

        this.setState({
            trailMapLoaded: false,
        });
    }

    handleTrailMapLoaded = event => {
        const trailMapImage = event.target;
        trailMapImage.onload = null;

        if (this.image !== trailMapImage) {
            //should never happen...
            return;
        }

        if (!this.canvas) {
            //should never happen...
            return;
        }

        //prepare canvas for drawing
        this.canvas.width = trailMapImage.width;
        this.canvas.height = trailMapImage.height;

        //canvas will be drawn on componentDidUpdate 
        this.setState({
            trailMapLoaded: true,
        });
    }

    get canvasReady() {
        if (!this.canvas) {
            return false;
        }
        if (!this.image) {
            return false;
        }
        if (!this.state.trailMapLoaded) {
            return false;
        }
        return this.image.height
            && this.image.width
            && this.canvas.width === this.image.width
            && this.canvas.height === this.image.height;
    }

    tryDrawCanvas() {
        if (this.canvasReady) {
            const context = this.canvas.getContext('2d');
            context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            context.drawImage(this.image, 0, 0);
            this.tryDrawBubbles();
        }
    }

    tryDrawBubbles() {
        const { timePeriods, selectedTimestamp } = this.props.waitTimeDate || {};
        if (!timePeriods || timePeriods.length === 0 || !selectedTimestamp) {
            return;
        }

        const bubbleDefinitions = getBubbleDefinitions(this.props.trailMapFilename);
        const waitTimes = timePeriods.find(timePeriod => timePeriod.timestamp === selectedTimestamp).waitTimes;
        const bubbles = waitTimes.reduce((result, { liftID, seconds }) => {
                const bubble = bubbleDefinitions.find(({ id }) => id === liftID.toString());
                if (bubble != null) {
                    result.push({
                        ...bubble,
                        text: seconds.toString(),
                    });
                }
                return result;
        }, []);

        const defaults = {
            textDrawing: true,
            readonly: true,
            width: 37,
            height: 'auto',
            fontWeight: 'bold',
            background: '#D44126',
            color: '#fff',
            opacity: 1,
            bubbleStyle: 'speak',
        };

        new ComicBubbles('trailMap', {
            canvas: defaults,
            bubble: bubbles,
        });
    }

    render() {
        return (
            <React.Fragment>
                <PinchZoomPan initialScale={1} zoomButtons={this.canvasReady}>
                    <canvas
                        id='trailMap'
                        ref={this.setCanvas}
                        width={0}
                        height={0}
                        scale={1}
                    />
                </PinchZoomPan>,
                <ModalCircularProgress open={!this.canvasReady} />
            </React.Fragment>
        );
    }
}

export default WaitTimeMap;
