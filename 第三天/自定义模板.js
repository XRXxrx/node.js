function add(x, y, z) {
    return x + y + z;
}

function sub(x, y, z) {
    return x - y - z;
}
//导出模板
module.exports = {
    'add': add,
    'sub': sub
}