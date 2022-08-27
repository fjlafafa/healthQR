package Types

import Types.UserMeta._

case class UserIdentity(
                 id : UserId,
                 realName: RealName,
                 password: Password,
                 identityNumber: IdentityNumber,
                 permission: Permission
                )
