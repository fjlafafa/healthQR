package Classes

import Classes.UserMeta._

case class UserIdentity(
                 id : UserId,
                 realName: RealName,
                 password: Password,
                 identityNumber: IdentityNumber,
                 permission: Permission
                )
