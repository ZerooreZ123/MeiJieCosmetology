export const lineStruct = {
  color: ["#409eff"],
  title: {
    text: "",
    x: "center",
    align: "right"
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: []
  },
  yAxis: {
    type: "value"
  },
  series: [
    {
      data: [],
      type: "line",
      areaStyle: {}
    }
  ]
};
export const barStruct = {
  color: ["#409eff"],
  title: {
    text: "",
    x: "center",
    align: "right"
  },
  xAxis: {
    type: "category",
    data: []
  },
  yAxis: {
    type: "value"
  },
  series: [
    {
      data: [],
      type: "bar"
    }
  ]
};
export const pieStruct = {
  title: {
    text: "",
    x: "center"
  },
  series: [
    {
      type: "pie",
      radius: "55%",
      center: ["50%", "50%"],
      data: [], // value, name
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)"
        }
      }
    }
  ]
};
