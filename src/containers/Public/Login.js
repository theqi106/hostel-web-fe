import React, { useEffect, useState } from "react";
import { Button, InputForm } from "../../components";
import { useLocation, useNavigate } from "react-router-dom";
import * as action from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import validate from "../../ultils/validateField";
const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispath = useDispatch();
  const { isLogin, msg, update, msgSuccess } = useSelector(
    (state) => state.auth
  );
  const [isRegister, setIsRegister] = useState(location.state?.flag);
  const [invalidField, setInvalidField] = useState([]);
  const [payload, setPayload] = useState({
    phone: "",
    password: "",
    name: "",
  });

  useEffect(() => {
    setIsRegister(
      location.state?.flag === undefined ? true : location.state?.flag
    );
  }, [location.state?.flag]);

  useEffect(() => {
    // !isRegister &&  isLogin && navigate("/");
    if (!isRegister && isLogin) {
      navigate("/");
    } else if (isRegister && !isLogin) {
      setIsRegister(false);
      navigate("/login");
    }
  }, [isLogin]);
  useEffect(() => {
    {
      msg && Swal.fire("Oops!", msg, "error");
    }
  }, [msg, update]);
  useEffect(() => {
    {
      msgSuccess &&
        Swal.fire("Congratulate!", msgSuccess, "success").then(() => {
          setIsRegister(false);
          navigate("/login");
          setPayload({
            phone: "",
            password: "",
            name: "",
          });
          dispath({ type: "RESET_MSG_SUCCESS" });
          navigate("/login");
        });
    }
  }, [msgSuccess]);

  const handleSubmit = async () => {
    let finalPayload = isRegister
      ? payload
      : {
          phone: payload.phone,
          password: payload.password,
        };
    let invalid = validate(finalPayload,setInvalidField);
    if (invalid === 0)
      isRegister
        ? dispath(action.register(payload))
        : dispath(action.login(payload));
  };
  
  return (
    <div className="w-full flex justify-center items-center">
      <div className="bg-white w-[600px] p-[30px] pb-[100px] rounded-md shadow-sm">
        <h3 className="font-semibold text-2xl mb-3">
          {isRegister ? "Register" : "Login"}
        </h3>
        <div className="w-full flex flex-col gap-3">
          {isRegister && (
            <InputForm
              invalidField={invalidField}
              lable={"Name"}
              value={payload.name}
              setValue={setPayload}
              keyPayload="name"
              setInvalidField={setInvalidField}
            />
          )}
          <InputForm
            invalidField={invalidField}
            lable={"Phone Number"}
            value={payload.phone}
            setValue={setPayload}
            keyPayload="phone"
            setInvalidField={setInvalidField}
          />
          <InputForm
            invalidField={invalidField}
            lable={"Password"}
            value={payload.password}
            setValue={setPayload}
            keyPayload="password"
            type="password"
            setInvalidField={setInvalidField}
          />
          <Button
            text={isRegister ? "Register" : "Login"}
            textColor={"text-white"}
            bgColor={"bg-secondary1"}
            fullWidth
            onClick={handleSubmit}
          />
        </div>
        <div className="mt-7 flex items-center justify-between">
          {isRegister ? (
            <small>
              You have account ?
              <span
                className="text-[blue] hover:text-[orange] cursor-pointer underline"
                onClick={() => {
                  setIsRegister(false);
                  setInvalidField([]);
                  setPayload({
                    phone: "",
                    password: "",
                    name: "",
                  });
                }}
              >
                Go to Login
              </span>
            </small>
          ) : (
            <>
              <small className="text-[blue] hover:text-[orange] cursor-pointer">
                Forget your password
              </small>
              <small className="text-[blue] hover:text-[orange] cursor-pointer">
                <span
                  onClick={() => {
                    setIsRegister(true);
                    setInvalidField([]);
                    setPayload({
                      phone: "",
                      password: "",
                      name: "",
                    });
                  }}
                >
                  Create new account
                </span>
              </small>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
