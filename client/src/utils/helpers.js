import moment from "moment";

export const getLoggedInUserName = (user) =>{
    console.log('final data',user);
    if(user.userType === "donar")
        return user.name;
    else if(user.userType === "hospital")
            return user.hospitalName;
    else
    return user.organizationName;
};

export const getAntdInputValidation = () =>{
    return [{
        required: true,
        message: "Required",
    },
];
};

export const getDateFormat = (date) =>{
    return moment(date).format("DD MMM YYYY hh:mm A")
}