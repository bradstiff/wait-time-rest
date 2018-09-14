// todo: move to DB

export const getBubbleDefinitions = trailMapFilename => {
    switch (trailMapFilename) {
        case 'steamboat.png':
            return [
                { id: '47356', tag: 'Bar', x: 335, y: 231, tailLocation: 'n', tailX: 355, tailY: 276 },
                { id: '47355', tag: 'Elk', x: 987, y: 336, tailLocation: 'n', tailX: 973, tailY: 380 },
                { id: '47353', tag: 'Sout', x: 1250, y: 246, tailLocation: 'n', tailX: 1236, tailY: 288 },
                { id: '47350', tag: 'Chri', x: 1272, y: 741, tailLocation: 'n', tailX: 1319, tailY: 781 },
                { id: '42146', tag: 'Sund', x: 928, y: 315, tailLocation: 'n', tailX: 912, tailY: 354 },
                { id: '42145', tag: 'Bash', x: 730, y: 540, tailLocation: 'n', tailX: 753, tailY: 588 },
                { id: '42144', tag: 'Gond', x: 1340, y: 696, tailLocation: 'n', tailX: 1375, tailY: 759 },
                { id: '42141', tag: 'Thun', x: 530, y: 571, tailLocation: 'n', tailX: 570, tailY: 617 },
                { id: '47357', tag: 'Four', x: 500, y: 326, tailLocation: 'n', tailX: 477, tailY: 379 },
                { id: '42140', tag: 'BC', x: 429, y: 368, tailLocation: 'n', tailX: 433, tailY: 427 },
                { id: '42143', tag: 'storm', x: 351, y: 372, tailLocation: 'n', tailX: 390, tailY: 421 },
                { id: '47358', tag: 'pony', x: 255, y: 433, tailLocation: 'n', tailX: 238, tailY: 476 },
                { id: '47351', tag: 'Prev', x: 1205, y: 772, tailLocation: 'n', tailX: 1289, tailY: 792 },
                { id: '50719', tag: 'Suns', x: 1181, y: 210, tailLocation: 'n', tailX: 1223, tailY: 260 },
            ];
        case 'steamboatMorningsidePark.png':
            return [
                { id: '47352', tag: 'morn', x: 312, y: 316, tailLocation: 'n', tailX: 332, tailY: 361 },
            ];
        case 'winter-park.png':
            return [
                { id: '55569', tag: 'Gemi', x: 532, y: 934, tailLocation: 'n', tailX: 514, tailY: 974 },
                { id: '55570', tag: 'Ende', x: 698, y: 916, tailLocation: 'n', tailX: 679, tailY: 946 },
                { id: '45250', tag: 'Eagl', x: 1113, y: 349, tailLocation: 'n', tailX: 1133, tailY: 394 },
                { id: '45249', tag: 'Pano', x: 139, y: 332, tailLocation: 'n', tailX: 159, tailY: 377 },
                { id: '44956', tag: 'Pion', x: 1383, y: 761, tailLocation: 'n', tailX: 1403, tailY: 806 },
                { id: '44955', tag: 'Zeph', x: 418, y: 898, tailLocation: 'n', tailX: 428, tailY: 945 },
                { id: '44621', tag: 'High', x: 940, y: 438, tailLocation: 'n', tailX: 960, tailY: 483 },
                { id: '42115', tag: 'Olym', x: 1178, y: 781, tailLocation: 's', tailX: 1188, tailY: 750 },
                { id: '42114', tag: 'Pros', x: 887, y: 883, tailLocation: 'n', tailX: 851, tailY: 914 },
                { id: '42113', tag: 'Arro', x: 482, y: 896, tailLocation: 'n', tailX: 458, tailY: 957 },
                { id: '42112', tag: 'Look', x: 1098, y: 770, tailLocation: 's', tailX: 1167, tailY: 740 },
                { id: '42111', tag: 'Eski', x: 799, y: 877, tailLocation: 'n', tailX: 838, tailY: 928 },
                { id: '42109', tag: 'Chal', x: 378, y: 650, tailLocation: 'n', tailX: 411, tailY: 700 },
                { id: '42106', tag: 'Supe', x: 449, y: 684, tailLocation: 'n', tailX: 473, tailY: 744 },
                { id: '44620', tag: 'Sunn', x: 125, y: 400, tailLocation: 'w', tailX: 193, tailY: 408 },
                { id: '55571', tag: 'Pony', x: 433, y: 779, tailLocation: 's', tailX: 483, tailY: 748 },
                { id: '42108', tag: 'Iron', x: 521, y: 729, tailLocation: 'n', tailX: 494, tailY: 754 },
            ];
        case 'serre-chevalier-vallee.png':
            return [
                { id: '42505', tag: "RoB", x: 488, y: 454, tailLocation: 'se', tailX: 521, tailY: 505 },
                { id: '57937', tag: "CrN", x: 507, y: 538, tailLocation: 'n', tailX: 524, tailY: 514 },
                { id: '47564', tag: "SeP", x: 204, y: 724, tailLocation: 'se', tailX: 257, tailY: 762 },
                { id: '42512', tag: "Pit", x: 185, y: 937, tailLocation: 'ne', tailX: 235, tailY: 927 },
                { id: '47565', tag: "Tou", x: 375, y: 965, tailLocation: 'nw', tailX: 357, tailY: 926 },
                { id: '42494', tag: "Sta", x: 421, y: 848, tailLocation: 'w', tailX: 371, tailY: 881 },
                { id: '42509', tag: "Pr1", x: 148, y: 1144, tailLocation: 'se', tailX: 189, tailY: 1178 },
                { id: '45609', tag: "Pr2", x: 316, y: 808, tailLocation: 's', tailX: 332, tailY: 882 },
                { id: '42497', tag: "Aig", x: 864, y: 943, tailLocation: 'ne', tailX: 917, tailY: 920 },
                { id: '42510', tag: "BC1", x: 1078, y: 639, tailLocation: 's', tailX: 1104, tailY: 691 },
                { id: '54481', tag: "Rep", x: 1163, y: 658, tailLocation: 'n', tailX: 1181, tailY: 626 },
                { id: '42501', tag: "GS", x: 1234, y: 657, tailLocation: 'nw', tailX: 1213, tailY: 629 },
                { id: '42507', tag: "Pro", x: 1018, y: 694, tailLocation: 'e', tailX: 1092, tailY: 703 },
                { id: '54498', tag: "BC2", x: 1115, y: 730, tailLocation: 'nw', tailX: 1112, tailY: 695 },
                { id: '42503', tag: "GA", x: 1119, y: 594, tailLocation: 'se', tailX: 1177, tailY: 620 },
                { id: '53279', tag: "Rat", x: 1105, y: 1152, tailLocation: 'se', tailX: 1175, tailY: 1197 },
                { id: '42513', tag: "Ble", x: 1216, y: 1154, tailLocation: 'sw', tailX: 1188, tailY: 1198 },
                { id: '47568', tag: "Cha", x: 1356, y: 1026, tailLocation: 'nw', tailX: 1322, tailY: 995 },
                { id: '42516', tag: "Com", x: 1144, y: 912, tailLocation: 'e', tailX: 1210, tailY: 908 },
                { id: '47567', tag: "SeC", x: 1229, y: 927, tailLocation: 'ne', tailX: 1300, tailY: 890 },
                { id: '42492', tag: "OdB", x: 1351, y: 875, tailLocation: 'w', tailX: 1310, tailY: 890 },
                { id: '46979', tag: "Alp", x: 1498, y: 675, tailLocation: 'nw', tailX: 1461, tailY: 656 },
                { id: '42496', tag: "For", x: 1424, y: 761, tailLocation: 'se', tailX: 1476, tailY: 801 },
                { id: '45509', tag: "Ara", x: 1551, y: 1096, tailLocation: 'se', tailX: 1618, tailY: 1118 },
                { id: '44739', tag: "Fre", x: 1752, y: 1048, tailLocation: 'sw', tailX: 1699, tailY: 1082 },
                { id: '45582', tag: "Fre2", x: 1837, y: 827, tailLocation: 'nw', tailX: 1792, tailY: 814 },
                { id: '54543', tag: "Chz", x: 1720, y: 1115, tailLocation: 'nw', tailX: 1680, tailY: 1086 },
                { id: '42514', tag: "CdB", x: 1685, y: 1153, tailLocation: 'nw', tailX: 1675, tailY: 1097 },
                { id: '53740', tag: "Mic", x: 1602, y: 1149, tailLocation: 'ne', tailX: 1644, tailY: 1115 },
                { id: '47566', tag: "PdB", x: 1606, y: 734, tailLocation: 'ne', tailX: 1657, tailY: 708 },
                { id: '42500', tag: "CoC", x: 1559, y: 630, tailLocation: 'e', tailX: 1627, tailY: 641 },
                { id: '42502', tag: "ClG", x: 1594, y: 546, tailLocation: 'se', tailX: 1637, tailY: 609 },
                { id: '42511', tag: "Cre", x: 1671, y: 708, tailLocation: 'ne', tailX: 1718, tailY: 670 },
                { id: '54497', tag: "Eyc", x: 1569, y: 458, tailLocation: 'ne', tailX: 1627, tailY: 438 },
                { id: '44742', tag: "Pon", x: 1870, y: 1145, tailLocation: 'n', tailX: 1885, tailY: 1096 },
                { id: 'b1526482540355', tag: "Bez", x: 1932, y: 1073, tailLocation: 'w', tailX: 1896, tailY: 1090 },
                { id: '49066', tag: "Val", x: 1803, y: 747, tailLocation: 'nw', tailX: 1793, tailY: 712 },
                { id: '42504', tag: "Bar", x: 1800, y: 645, tailLocation: 'sw', tailX: 1756, tailY: 673 },
                { id: '42506', tag: "Clo", x: 1902, y: 505, tailLocation: 'w', tailX: 1843, tailY: 522 },
                { id: '42517', tag: "Mea", x: 1805, y: 475, tailLocation: 'se', tailX: 1839, tailY: 517 },
                { id: '42214', tag: "Cuc", x: 2379, y: 511, tailLocation: 'ne', tailX: 2403, tailY: 479 },
                { id: '42498', tag: "Ey2", x: 2589, y: 609, tailLocation: 'ne', tailX: 2652, tailY: 589 },
                { id: '42213', tag: "Yre", x: 2596, y: 532, tailLocation: 'se', tailX: 2662, tailY: 581 },
                { id: '42495', tag: "Cib", x: 2688, y: 645, tailLocation: 'nw', tailX: 2674, tailY: 587 },
                { id: '42215', tag: "Eto", x: 2409, y: 886, tailLocation: 'ne', tailX: 2463, tailY: 866 },
                { id: '43747', tag: "Lau", x: 2611, y: 840, tailLocation: 'nw', tailX: 2596, tailY: 808 },
                { id: '42216', tag: "Aya", x: 2558, y: 1011, tailLocation: 'se', tailX: 2626, tailY: 1041 },
                { id: '42518', tag: "Bac", x: 2669, y: 1069, tailLocation: 'nw', tailX: 2635, tailY: 1042 },
                { id: '42388', tag: "PrC", x: 2719, y: 965, tailLocation: 'sw', tailX: 2700, tailY: 1015 },
            ];
        default:
            return [];
    }
};
