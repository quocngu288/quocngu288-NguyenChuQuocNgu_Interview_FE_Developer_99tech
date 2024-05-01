var sum_to_n_a = function (n) {
  // your code here
  sum = 0;
  for (var i = 0; i < n; i++) {
    sum += i + 1;
  }
  return sum;
};

var sum_to_n_b = function (n) {
  // your code here
  return (n * (n + 1)) / 2;
};

var sum_to_n_c = function (n) {
  // your code here
  if (n === 1) {
    return 1;
  } else {
    return n + sum_to_n_c(n - 1);
  }
};

const a = sum_to_n_a(5);
const b = sum_to_n_b(5);
const c = sum_to_n_c(5);

console.log("sum a", a);
console.log("sum b", b);
console.log("sum c", c);
