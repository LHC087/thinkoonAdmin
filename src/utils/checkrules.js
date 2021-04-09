var checkNumberNum = (rule, value, callback) => {
  if (value) {
    var reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
    if (!reg.test(value)) {
      callback(new Error("请输入正确的数字"));
    } else {
      var reg = /^[0]+[0-9]*$/;
      if (reg.test(value)) {
        if (value == '0') {
          callback();
        } else {
          callback(new Error("不能以0开头的组合数字"));
        }
      } else {
        var reg = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/;
        if (value && !reg.test(value)) {
          if (value == '0.0' || value == '0.00') {
            callback(new Error("请输入正确的数字"));
          } else {
            callback(new Error("数字最多保留2位小数"));
          }
        } else {
          callback();
        }
      }
    }
  } else {
    callback();
  }
};

var checkTextZeroNum = (rule, value, callback) => {
  if (value) {
    var reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
    if (!reg.test(value)) {
      callback(new Error("请输入正确的数字"));
    } else {
      if (value == 0) {
        callback(new Error("请输入大于0的数字"));
      } else {
        var reg = /^[0]+[0-9]*$/;
        if (reg.test(value)) {
          callback(new Error("不能以0开头的组合数字"));
        } else {
          callback();
        }
      }
    }
  } else {
    callback();
  }
};

var checkTextNum = (rule, value, callback) => {
  if (value) {
    var reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
    if (!reg.test(value)) {
      callback(new Error("请输入正确的数字"));
    } else {
      if (value != '0') {
        var reg = /^[0]+[0-9]*$/;
        if (reg.test(value)) {
          callback(new Error("不能以0开头的组合数字"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    }
  } else {
    callback();
  }
};

function importNoAllowedInputE(e) {
  let key = e.key;
  // 不允许输入'e'
  if (key === "e") {
    e.returnValue = false;
    return false;
  }
  return true;
};


export {
  checkNumberNum,
  checkTextZeroNum,
  checkTextNum,
  importNoAllowedInputE,
}
