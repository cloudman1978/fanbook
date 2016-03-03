var str = "346593403645_10154041344408646";
var arr = str.split("_");
arr = arr.map(function (val) { return +val + 1; });
console.log(arr[0]);
