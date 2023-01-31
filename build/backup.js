d3.csv(dataSet,

    // When reading the csv, I must format variables:
    function(d){
      return { Time : d3.timeParse("%Y")(d.Time), Anomaly : d.Anomaly }
    },



    // Now I can use this dataset:
    function(data) {
  
      // Add X axis --> it is a Time format
      var x = d3.scaleTime()
        .domain(d3.extent(data, function(d) { return d.Time; }))
        .range([ 0, width ]);
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
  
      // Add Y axis
      var y = d3.scaleLinear()
        .domain([-1, d3.max(data, function(d) { return d.Anomaly; })])
        .range([ height, 0 ]);
      svg.append("g")
        .call(d3.axisLeft(y));

      
      // Horizontal Zero Line
      // svg.append("g")
      //   .attr("transform", "translate(0, "+y(0)+")")
      //   .append("line")
      //   .attr("x2",width)
      //   .style('stroke','grey')
      //   .style("stroke-dasharray", "5, 3")
      //   .style("stroke-width","2px");
      

    
      // X label
      svg.append("text")
          .attr("class", "x label")
          .attr("text-anchor","end")
          .attr("x",width)
          .attr("y", height - 6)
          .text("Year");
      
      // Y label
      svg.append("text")
          .attr("class", "y label")
          .attr("text-anchor","end")
          .attr("y", 7)
          .attr("dy", ".75em")
          .attr("transform","rotate(-90)")
          .text("Temperature Anomaly");
  
      // Add the line
      svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
          .x(function(d) { return x(d.Time) })
          .y(function(d) { return y(d.Anomaly) })
          )
  
  })