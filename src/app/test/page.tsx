import { encode } from "@auth/core/jwt";

export default async function Test() {
  const test = await encode({
    salt: "salt",
    secret: "p7jNlDHks88U2pqcDrdHdZTuA8/4xA7NurJ5nnIjKRY=",
    maxAge: 1000 * 60 * 60,
    token: {
      name: "zusor",
      email: "tobias.d.messner@gmail.com",
      picture:
        "https://cdn.discordapp.com/avatars/124906016063094785/99f4cf2acbe0260f4f345085120502a9.png",
      sub: "clr9b5hz70000dq5w2yf3408p",
      jti: "a0f567cb-a125-40d8-80f6-d23810ad966f",
    },
  });
  return <div>{test}</div>;
}
