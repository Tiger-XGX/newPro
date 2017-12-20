//获取localStorage里的值,转换成数组
export function getLocal(key) {
    var str = localStorage.getItem(key) || "[]";
    var arr = JSON.parse(str);
    return arr;
}
//往localStorage里添加值,先判断是否为空,如果有值,先转成数组,往数组里添加内容,在转成字符串存进去
export function setLocal(key, value) {
    var str = localStorage.getItem(key) || "[]";
    var arr = JSON.parse(str);
    arr.push(value);
    localStorage.setItem(key, JSON.stringify(arr));
}
//清除localStorage里的值
export function removeLocal(key) {
    localStorage.removeItem(key);
}
//把localStorage里的数组里的对象改成{id:数量,id:数量}类型,方便操作
export function getObj(key) {
    var arr = getLocal(key);
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
        if (!obj[arr[i].shopid]) {
            obj[arr[i].shopid] = arr[i].count;
        } else {
            obj[arr[i].shopid] = obj[arr[i].shopid] + arr[i].count
        }
    };
    return obj;
}