const constructLink = (id: string, keyIv: string) => {
  const host = window.location.protocol + "//" + window.location.host;
  return `${host}/link?id=${id}&token=${keyIv}`;
}

export default constructLink;