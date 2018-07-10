export function guid() {
  return "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx".replace(/[x]/g, function(c) {
    var r = (Math.random() * 16) | 0;
    var v = c === "x" ? r : c;
    return v.toString(16);
  });
}

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
    node.guid = guid();
    if (hasChildren(node)) {
      node.children = node.categoryList;
      transform(node.categoryList);
    } else if (node.data) {
      node.data.forEach(d => {
        d.label = d.name;
        d.guid = guid();
        d.serviceType = node.categoryType;
      });
      node.children = node.data;
    }
  });
  return treeList;
}

// console.log(transform(treeList));

export default transform;
