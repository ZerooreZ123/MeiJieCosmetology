export default function print(item) {
  var strStyleCSS = `<style>
  .contentWrap {
    background: #f7f7f7;
  }

  .contentWrap .setting {
    width: 320px;
    height: 70px;
    line-height: 70px;
    font-size: 14px;
    text-indent: 42px;
    background: #fff;
    margin-bottom: 16px;
  }

  .contentWrap .wrap .sideWrap {
    min-height: 332px;
    width: 320px;
    padding: 30px 5px;
    background: #fff;
  }

  .contentWrap .wrap .sideWrap .info {
    border: 2px solid #f7f7f9;
  }

  .contentWrap .wrap .sideWrap .info .infoHead div {
    font-size: 20px;
    color: #000;
    font-weight: 700;
    padding: 20px 0 16px;
  }

  .contentWrap .wrap .sideWrap .info .infoHead span {
    height: 18px;
    line-height: 18px;
  }

  .contentWrap .wrap .sideWrap .info .infoFoot div {
    font-size: 20px;
    color: #000;
    font-weight: 700;
    padding: 20px 0 16px;
  }

  .contentWrap .wrap .sideWrap .info .infoFoot span {
    height: 30px;
    line-height: 30px;
  }

  .contentWrap .wrap .sideWrap .module {
    padding: 15px 5px 10px;
  }

  .contentWrap .wrap .sideWrap .module span {
    line-height: 30px;
  }

  .contentWrap .wrap .sideWrap .item {
    padding: 0 5px;
  }

  .contentWrap .wrap .sideWrap .item .itemModule {
    padding: 15px 0;
    border-bottom: 1px dotted #666;
  }

  .contentWrap .wrap .sideWrap .item .option {
    line-height: 30px;
  }

  .contentWrap .wrap .sideWrap .item .title {
    margin: 15px 0;
  }

  .contentWrap .wrap .sideWrap .item .border {
    border-bottom: 1px dotted #666;
  }

  .contentWrap .wrap .sideWrap .write {
    text-indent: 20px;
    margin: 16px 0 50px;
  }

  

  .flex_center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .flex_between {
    display: flex;
    justify-content: space-between;
  }

  .flex_column {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .flex-start {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  </style>`;

  this.item = item;

  var html = this.$refs.printHtml.innerHTML;
  var strFormHtml = strStyleCSS + "<body>" + html + "</body>";

  //   console.log(strFormHtml);
  // ===如下空白位置适合调用统一功能(如注册语句、语言选择等):===
  window.LODOP.SET_LICENSES("安徽奇兵医学科技有限公司", "56E2EB898EE17DEBD030D1E8A683CAFE", "安徽奇兵醫學科技有限公司", "423D486AF17E2120FEB7B2BDDF66F396");
  window.LODOP.SET_LICENSES("THIRD LICENSE", "", "AnHui Ace-power Medical and Technology Co., Ltd", "709251107F8D9D680D1A81F88BED121F");
  // ===========================================================
  window.LODOP.PRINT_INITA(1, 1, 320, 3200, "打印控件功能V201806081600");
  // window.LODOP.ADD_PRINT_TEXT(10, 60, 300, 200, "这是测试的纯文本，下面是超文本:");
  window.LODOP.ADD_PRINT_HTM(0, 0, "100%", "100%", strFormHtml);
  window.LODOP.SET_PRINTER_INDEX("Gprinter", "GP-U80250 series");
  //   window.LODOP.PREVIEW();
    window.LODOP.PRINT();
  //   window.close();
  // window.LODOP.PRINT_SETUP();
  // window.LODOP.PRINT_DESIGN();
}
