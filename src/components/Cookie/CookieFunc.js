var cookie;
const CreateCookie = (user) => {
    document.cookie = 'AccountID=' + user + ';  max-age=600;';
}

const BreakCookie = (user) => {
    document.cookie = 'AccountID=' + user + '; expires=Thu,01 Jan 1970 00:00:00 UTC;'
}

const GetCookie = (user) => {
    cookie = user.slice(8)
}





export { CreateCookie, BreakCookie, GetCookie, cookie } 