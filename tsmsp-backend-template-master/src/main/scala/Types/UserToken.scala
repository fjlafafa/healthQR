package Types

import Types.UserMeta.{Token, UserId}
import org.joda.time.DateTime

case class UserToken(
                      userId : UserId,
                      token : Token,
                      refreshTime : DateTime
                    )
