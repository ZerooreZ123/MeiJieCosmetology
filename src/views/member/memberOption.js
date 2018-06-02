const optionHuan = {
  title: {
    text: "会员详情",
    x: "left"
  },
  calculable: false,
  series: [
    {
      label: {
        normal: {
          show: true
        },
        emphasis: {
          show: true
        }
      },
      lableLine: {
        normal: {
          show: true
        },
        emphasis: {
          show: true
        }
      },
      type: "pie",
      radius: [30, 110],
      center: ["50%", "50%"],
      data: [
        { value: 10, name: "rose1", itemStyle: { color: "#80b6fc" } },
        { value: 5, name: "rose2", itemStyle: { color: "#86d560" } },
        { value: 15, name: "rose3", itemStyle: { color: "#ff999a" } }
      ]
    }
  ]
};
const optionPie = {
  title: {
    text: "会员渠道分析",
    x: "left"
  },
  legend: {
    type: "scroll",
    orient: "vertical",
    right: 10,
    top: 20,
    bottom: 20,
    data: ["rose1", "rose2", "rose3", "rose4", "rose5", "rose6", "rose7", "rose8"]
  },
  calculable: false,
  series: [
    {
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: true
        }
      },
      lableLine: {
        normal: {
          show: true
        },
        emphasis: {
          show: true
        }
      },
      type: "pie",
      radius: [30, 110],
      center: ["50%", "50%"],
      roseType: "area",
      data: [
        { value: 10, name: "rose1" },
        { value: 5, name: "rose2" },
        { value: 15, name: "rose3" },
        { value: 25, name: "rose4" },
        { value: 20, name: "rose5" },
        { value: 35, name: "rose6" },
        { value: 30, name: "rose7" },
        { value: 40, name: "rose8" }
      ]
    }
  ]
};
export { optionHuan, optionPie };
