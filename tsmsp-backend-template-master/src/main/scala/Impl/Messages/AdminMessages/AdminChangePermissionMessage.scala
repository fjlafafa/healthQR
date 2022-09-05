package Impl.Messages.AdminMessages

import Exceptions.{PermissionDeniedException, TokenNotExistsException}
import Globals.IdLengths.userToken
import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.UserIdentityTable
import Types.UserMeta.{Administrator, NormalUser, Permission, Token}
import Utils.DBUtils
import org.joda.time.DateTime
import Utils.DateTimeAutoBuilder._

import scala.util.Try

case class AdminChangePermissionMessage(adminToken: Token, clientToken:Token, newPermission: Permission) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val permission = UserIdentityTable.getPermissionFromToken(adminToken).get
    val clientId = DBUtils.exec(UserIdentityTable.checkUserIdByToken(clientToken)).getOrElse(throw TokenNotExistsException())

    if (permission != Administrator) {
      throw PermissionDeniedException()
    }
    DBUtils.exec(UserIdentityTable.updatePermissionById(clientId,newPermission))
    TSMSPReply(STATUS_OK,"设置权限成功！")
  }
}