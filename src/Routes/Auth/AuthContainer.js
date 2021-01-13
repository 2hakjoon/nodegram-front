import React, {useState} from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { CONFIRM_SECRET, CREATE_ACCOUNT, LOCAL_LOG_IN, LOG_IN } from "./AuthQueries";
import { toast } from "react-toastify";

export default () =>{
    const [action, setAction] = useState("logIn");
    const userid = useInput("");
    //const password = useInput("");
    const username = useInput("");
    const secret = useInput("");
    const email = useInput("");
    const [requestSecretMutation] = useMutation(LOG_IN, {
        variables : {email : email.value}});

    const [crateAccountMutation] = useMutation(CREATE_ACCOUNT,{
        variables:{
            email: email.value,
            userName: username.value
        }
    })

    const [confirmSecretMutation] = useMutation(CONFIRM_SECRET,{
        variables: {
            email: email.value,
            secret: secret.value
        }
    });

    const [localLogInMutation] = useMutation(LOCAL_LOG_IN)     
    const onSubmit = async(e) =>{
        e.preventDefault();
        if(action === "logIn"){
            if(email.value !== ""){
                try{
                    const {data:{requestSecret}} = await requestSecretMutation();
                    console.log(requestSecret)
                    if(!requestSecret){
                        toast.error("계정이 없으시군요! 가입화면으로 자동으로 이동합니다.");
                        setTimeout(()=>setAction("signUp"), 3000);
                    }
                    else{
                        toast.success("이메일을 확인해보세요!");
                        setAction("confirm")
                    }
                }
                catch{
                    toast.error("로그인 요청을 실패하였습니다.")
                }
            }
            else {
                toast.error("이메일은 반드시 적어주세요.");
            }
        }
        else if(action === "signUp"){
            if(email.value !== "" &&
                username.value !== ""){
                try{
                    const {data:{createAccount}} = await crateAccountMutation();
                    console.log(createAccount);
                    if(!createAccount){
                        toast.error("회원가입에 실패하였습니다.");
                    }
                    else{
                        toast.success("회원가입에 성공하셨습니다. 로그인 해 주세요.");
                        setTimeout(() => setAction("logIn"), 3000);
                    }
                }
                catch{
                    toast.error("계정을 만들수 없습니다.")}
            }
            else{
                toast.error("모든 칸을 작성해주세요.")
            }
        }
        else if(action === "confirm"){
            if(secret.value !== ""){
                try{
                    const {data : {confirmSecret : token}} = await confirmSecretMutation();
                    if(token !== "" && token !== undefined){
                        localLogInMutation({variables: {token}})
                    }
                    else{
                        throw Error();
                    }
                }
                catch{
                    toast.error("잘못된 인증번호입니다.")
                }
            }
        };
    };

    return <AuthPresenter
        setAction={setAction}
        action ={action}
        userid={userid}
        username={username}
        //password={password}
        secret={secret}
        email={email}
        onSubmit={onSubmit}
    />;
};