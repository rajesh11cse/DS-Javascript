const prom1 = new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve("success1");
    }, 1000);
  });
  
  const prom2 = new Promise(function (resolve, reject) {
    setTimeout(() => {
      reject("error");
    }, 2000);
  });
  
  const prom3 = new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve("success2");
    }, 3000);
  });
  
  const prom4 = new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve("success3");
    }, 3000);
  });
  
  Promise.myall = function (values) {
    const promise = new Promise(function (resolve, reject) {
      let result = [];
      let total = 0;
      values.forEach((item, index) => {
        Promise.resolve(item)
          .then((res) => {
            result[index] = res;
            total++;
            if (total === values.length) resolve(result);
          })
          .catch((err) => {
            reject(err);
          });
      });
    });
    return promise;
  };
  
  Promise.myall([prom1, prom2, prom3])
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log("error = > ", err);
    });
  
  Promise.myall([prom1, prom3, prom4])
    .then((res) => {
      console.log(res);
    })
    .catch((er) => {
      console.log(er);
    });
  