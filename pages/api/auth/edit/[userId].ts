import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@Lib/prisma";
import { userSchema } from "@Lib/validations";
import { User } from "@prisma/client";
import { validateInput } from "@Lib/helpers";
import { DefaultResponse } from "src/types/shared";
import { RouteHandler } from "@Lib/RouteHandler";
import { isAuthorizedUser } from "@Lib/apiMiddleware";
import { ServerError } from "@Lib/utils";

async function editUserRoute(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>,
  next: Function
) {
  const error = validateInput(req.body, userSchema);
  if (error) {
    return next(new ServerError(error, 400));
  }

  const { username, email, firstName, lastName, phoneNumber, avatarURL } =
    userSchema.cast(req.body) as unknown as User;

  const { userId } = req.query;

  await prisma.user
    .update({
      where: { id: userId as string },
      data: {
        username,
        email,
        firstName,
        lastName,
        phoneNumber,
        avatarURL,
      },
    });

  res.json({ message: "User Update Successful" });
}

export default new RouteHandler()
  .put(isAuthorizedUser, editUserRoute)
  .init();
