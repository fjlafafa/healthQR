package Types

import Types.UserMeta._
import org.joda.time.DateTime

case class UserIdentity(
                         userId : UserId,
                         identityNumber: IdentityNumber,
                         password: PasswordHash,
                         realName: RealName,
                         token: Token,
                         refreshTime: DateTime,
                         permission: Role,
                         salt: Salt,
                         securityQuestion: SecurityQuestion,
                         securityAnswerHash: SecurityAnswerHash,
                            )
