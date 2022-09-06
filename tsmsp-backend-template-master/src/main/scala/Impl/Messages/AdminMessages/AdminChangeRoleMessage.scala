package Impl.Messages.AdminMessages

import Exceptions.{PermissionDeniedException, TokenNotExistsException}
import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.UserIdentityTable
import Types.UserMeta.{Administrator, Roles, Token}
import Utils.DBUtils
import org.joda.time.DateTime

import scala.util.Try

case class AdminChangeRoleMessage(adminToken: Token, clientToken: Token, newRole: Roles) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val role = UserIdentityTable.getRoleFromToken(adminToken).get
    val clientId = DBUtils.exec(UserIdentityTable.checkUserIdByToken(clientToken)).getOrElse(throw TokenNotExistsException())

    if (role != Administrator) {
      throw PermissionDeniedException()
    }
    DBUtils.exec(UserIdentityTable.updateRoleById(clientId, newRole))
    TSMSPReply(STATUS_OK, "设置权限成功！")
  }
}
