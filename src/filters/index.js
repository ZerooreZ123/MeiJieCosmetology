export default {
  money(v) {
    if (v === null || v === undefined) {
      v = 0;
    }
    return v.toFixed(2);
  }
};
