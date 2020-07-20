const data = {
    // RegExp
    email_reg: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    pass_reg: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,32}$/,
    name_reg: /^[a-zA-Z ]{2,20}$/i,
    full_name_reg: /^[a-zA-Z ]+$/,
    birthday_reg: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/gm,
    api_url: 'https://picsart-bootcamp-2020-api.herokuapp.com',
    defaultAvatar: 'https://firebasestorage.googleapis.com/v0/b/teambuilder-8f5fc.appspot.com/o/storage%2FteamBuilder%2F1595011536174_default-avatar.png?alt=media&token=2d9c47b3-544d-4f88-bbc1-23fced346483',
}

export default data