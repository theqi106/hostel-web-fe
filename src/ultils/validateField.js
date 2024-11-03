const validate = (payload, setInvalidField) => {
  let invalids = 0;
  let field = Object.entries(payload);
  field.forEach((item) => {
    if (item[1] === "") {
      setInvalidField((prev) => [
        ...prev,
        {
          name: item[0],
          msg: "Trường bắt buộc nhập.",
        },
      ]);
      invalids++;
    }
  });
  field.forEach((item) => {
    switch (item[0]) {
      case "password":
        if (item[1]?.length < 6) {
          setInvalidField((prev) => [
            ...prev,
            {
              name: item[0],
              msg: "Mật khẩu cần có ít nhất là 6 kí tự.",
            },
          ]);
          invalids++;
        }
        break;
      case "phone":
        if (!+item[1]) {
          setInvalidField((prev) => [
            ...prev,
            {
              name: item[0],
              msg: "Số điện thoại không hợp lệ.",
            },
          ]);
          invalids++;
        }
        if (item[1]?.length !== 10) {
          setInvalidField((prev) => [
            ...prev,
            {
              name: item[0],
              msg: "Số kí tự không hợp lệ cho điện thoại.",
            },
          ]);
          invalids++;
        }
        if (item[1][0] !== "0") {
          setInvalidField((prev) => [
            ...prev,
            {
              name: item[0],
              msg: "Số điện thoại phải bắt đầu bằng 0.",
            },
          ]);
          invalids++;
        }
        break;
      case "priceNumber":
      case "acreageNumber":
        if (+item[1] === 0) {
          setInvalidField((prev) => [
            ...prev,
            {
              name: item[0],
              msg: "Chưa đặt giá trị cho trường này.",
            },
          ]);
          invalids++;
        }
        if (!+item[1]) {
          setInvalidField((prev) => [
            ...prev,
            {
              name: item[0],
              msg: "Vui lòng nhập giá trị hợp lệ.",
            },
          ]);
          invalids++;
        }
        break;
    }
  });
  return invalids;
};
export default validate;
