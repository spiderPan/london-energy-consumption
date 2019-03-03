import * as d3 from 'd3';
import * as topojson from 'topojson';



var svg = d3.select("svg");

var path = d3.geoPath();

d3.json("data/us.json")
    .then(
        us => {
            svg.append("g")
                .attr("class", "counties")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.counties).features)
                .enter().append("path")
                .attr("d", path);

            // the following block is new, adding JS events
            let hoverEnabled = false;
            svg.on('mousedown', x => hoverEnabled = true)
                .on('mouseup', x => hoverEnabled = false)
            svg.selectAll('.counties path').on('mouseover', function () {
                if (hoverEnabled) {
                    this.classList.add('hovered');
                }
            });

            svg.append("path")
                .attr("class", "county-borders")
                .attr("d", path(topojson.mesh(us, us.objects.counties, function (a, b) {
                    return a !== b;
                })));
        },
        error => {
            throw error;
        });