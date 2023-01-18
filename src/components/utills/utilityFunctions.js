import HttpErrorCodes from "helpers/errors/httpErrorCodes";

// set max date for the bithdate picker, the age should be 14 years
export const setMaxDate = (numOfYears) => {
  let date = new Date(
    new Date().setFullYear(new Date().getFullYear() - numOfYears)
  );
  // let month = date.getMonth()
  let formattedDate =
    date.getFullYear() +
    "-" +
    (date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()) +
    "-" +
    (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());

  return formattedDate;
};

// validate each input field
export const validateFieldData = (fieldData) => {
  if (fieldData === "" || fieldData == null) {
    return false;
  }
  return true;
};

// to get base 64 encoding of a file
export const getBase64 = (file) => {
  return new Promise((resolve) => {
    let fileInfo;
    let baseURL = "";
    // Make new FileReader
    let reader = new FileReader();

    // Convert the file to base64 text
    reader.readAsDataURL(file);

    // on reader load somthing...
    reader.onload = () => {
      // Make a fileInfo Object
      baseURL = reader.result.split(",")[1];
      resolve(baseURL);
    };
  });
};

// validate password
export const isValidPassword = (password) => {
  var regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  return regex.test(password);
};

// validate phone number format
export const isValidPhoneNumber = (phoneNumber) => {
  var regex = /9[0-9]{8}$/; // 976543212
  return regex.test(phoneNumber);
};

// validate email
export const isValidEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

// return valid error message
export const handleErrorMessage = (error, defaultErrorMessage) => {
  if (error?.networkError) {
    return "Network error";
  } else if (error?.graphQLErrors) {
    if(error?.graphQLErrors[0]?.extensions?.internal){
      let { response } = error?.graphQLErrors[0]?.extensions?.internal;
      let { status } = response;
      if (HttpErrorCodes[status]) {
        return HttpErrorCodes[status];
      } else {
        return defaultErrorMessage;
      }

    } else if(error?.graphQLErrors[0]?.extensions?.message){
      return error?.graphQLErrors[0]?.extensions?.message
    }
    else{
      return defaultErrorMessage;
    }
   
  }
};
