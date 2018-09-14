import React from 'react';
import PropTypes from 'prop-types';
import PinchZoomPan from 'react-responsive-pinch-zoom-pan';

import ComicBubbles from '../comicbubbles/comicbubbles';
import ModalCircularProgress from '../common/ModalCircularProgress';
import { WaitTimeDateShape } from './types';
import { getBubbleDefinitions } from '../store/liftBubbleDefinitions';

class WaitTimeMap extends React.PureComponent {
    static propTypes = {
        trailMapFilename: PropTypes.string,
        waitTimeDate: WaitTimeDateShape,
    };

    static getDerivedStateFromProps(nextProps, state) {
        if (state.trailMap && nextProps.trailMapFilename !== state.trailMap.filename) {
            //trigger loading of next trail map
            return {
                trailMap: null,
            };
        }
        return null;
    }

    state = {
        trailMap: null,
    };

    componentDidMount() {
        this.checkLoadTrailMap();
        this.tryDrawCanvas();
    }

    componentDidUpdate() {
        this.checkLoadTrailMap();
        this.tryDrawCanvas();
    }

    checkLoadTrailMap() {
        const { trailMapFilename } = this.props;
        if (!trailMapFilename || this.state.trailMap) {
            //already loading / loaded, or filename not yet known
            return;
        }

        const image = new Image();
        image.alt = 'Trail Map';
        image.src = `${process.env.PUBLIC_URL}/trailmaps/${trailMapFilename}`;
        image.onload = event => this.handleTrailMapLoaded(trailMapFilename, event.target);
        this.setState({
            trailMap: {
                filename: trailMapFilename,
                loaded: false,
                image,
            }
        });
    }

    handleTrailMapLoaded = (trailMapFilename, trailMapImage) => {
        trailMapImage.onload = null;

        if (!this.canvas) {
            // component unmounted before image loaded
            return;
        }
        const { trailMap } = this.state;
        if (!trailMap || trailMap.filename !== trailMapFilename) {
            //browsed to next resort before previous resort's trailmap image loaded
            return;
        }
        this.canvas.width = trailMapImage.width;
        this.canvas.height = trailMapImage.height;
        this.setState({
            trailMap: {
                ...trailMap,
                loaded: true,
            }
        });
    }

    get canvasReady() {
        if (!this.canvas) {
            return false;
        }
        const { loaded, image } = this.state.trailMap || {};
        if (!image || !loaded) {
            return false;
        }
        return image.height
            && image.width
            && this.canvas.width === image.width
            && this.canvas.height === image.height;
    }

    tryDrawCanvas() {
        const context = this.canvas.getContext('2d');
        if (this.canvasReady) {
            context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            context.drawImage(this.state.trailMap.image, 0, 0);
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
        return ([
            <PinchZoomPan initialScale={1} zoomButtons={this.canvasReady} key='map'>
                <canvas
                    id='trailMap'
                    ref={canvas => this.canvas = canvas}
                    width={0}
                    height={0}
                    scale={1}
                />
            </PinchZoomPan>,
            <ModalCircularProgress open={!this.canvasReady} key='progress' />
        ]);
    }
}

export default WaitTimeMap;
