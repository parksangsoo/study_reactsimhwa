const setCookie = (name, value, exp = 5) => {
    console.log("쿠키저장")
    let date = new Date();
    date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
  
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}`;
    
  };

  export { setCookie };