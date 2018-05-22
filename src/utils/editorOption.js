const editorOption = {
  theme: "snow",
  modules: {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      // [{ size: ["small", false, "large", "huge"] }],
      // [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      // [{ font: [] }],
      // [{ align: [] }],
      ["clean"],
      ["link", "image"]
    ]
  },
  placeholder: "请输入内容",
  readOnly: false
};

export default editorOption;
