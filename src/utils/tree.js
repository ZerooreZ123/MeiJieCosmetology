// const treeList = [
//   {
//     id: 1,
//     categoryType: "1",
//     name: "文学",
//     parentId: 0,
//     level: 1,
//     catsort: 1,
//     categoryList: [
//       { id: 2, categoryType: "1", name: "课外书", parentId: 1, level: 1, catsort: 1, categoryList: [] },
//       { id: 3, categoryType: "1", name: "童话书", parentId: 1, level: 1, catsort: 1, categoryList: [] },
//       { id: 4, categoryType: "1", name: "课本", parentId: 1, level: 1, catsort: 1, categoryList: [] }
//     ]
//   },
//   {
//     id: 1,
//     categoryType: "1",
//     name: "文学",
//     parentId: 0,
//     level: 1,
//     catsort: 1,
//     categoryList: [
//       { id: 2, categoryType: "1", name: "课外书", parentId: 1, level: 1, catsort: 1, categoryList: [] },
//       { id: 3, categoryType: "1", name: "童话书", parentId: 1, level: 1, catsort: 1, categoryList: [] },
//       { id: 4, categoryType: "1", name: "课本", parentId: 1, level: 1, catsort: 1, categoryList: [] }
//     ]
//   }
// ];

function hasChildren(node) {
  if (node.categoryList === undefined || node.categoryList.length === 0) {
    return false;
  } else {
    return true;
  }
}

function transform(treeList) {
  treeList.forEach(node => {
    node.label = node.name;
    node.children = node.categoryList;
    if (hasChildren(node)) {
      transform(node.categoryList);
    }
  });
  return treeList;
}

// console.log(transform(treeList));

export default transform;
