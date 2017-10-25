function Slider () {
    const width = 480
    const height = width/50*47;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;


    slider_axis.attr('transform', `translate(0, ${innerHeight+20})`)

    slider_rect.attr("width", innerWidth)
          .attr("height", innerHeight)
          .attr('transform', `translate(0, ${innerHeight})`)

    var minDate = new Date('1997'),
        scale = d3.scaleTime()
            .domain([minDate, d3.timeYear.offset(minDate, 20)])
            .range([margin.left, innerWidth])
            .clamp(true),
        format = d3.timeFormat('%Y');

    updateHeader(minDate)
    add_shot(minDate)
    Stat_Table(minDate);



    slider_axis
        .attr('class', 'axis')
        .call(d3.axisBottom(scale).ticks(d3.timeYear.every(3)));

    slider_rect
        .attr("class", "slider")
        .call(d3.drag().on('drag', dragged));

    var rectWidth = 8;
    rect_entity.attr("x", margin.left)
               .attr("y", 0)
               .attr("width", rectWidth)
               .attr("height", 20);


    function updateHeader(date) {
        title.text(format(date)+'-'+(date.getFullYear()+1).toString()+' season shoting map')
                            .attr('x', margin.left)
                            .attr('y', margin.top);
    }


    function dragged(d) {
        const parseTime = d3.timeParse("%Y");
        var prev = title.text().split('-')[0]
        var x = Math.min(d3.event.x, innerWidth-margin.left);
                value = scale.invert(x);

        d3.select('.slider').attr('transform', 'translate(' + x + ',' + innerHeight + ')');
        updateHeader(value);
        if (value.getFullYear() != parseTime(prev).getFullYear()) add_shot(value); Stat_Table(value);
    }
}

