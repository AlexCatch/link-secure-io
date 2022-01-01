const constructLink = (id: string, keyIv: string, hmac: string) => {
  const host = window.location.protocol + "//" + window.location.host;
  return `${host}/link?id=${id}&token=${keyIv}&verif=${hmac}`;
}

export default constructLink;