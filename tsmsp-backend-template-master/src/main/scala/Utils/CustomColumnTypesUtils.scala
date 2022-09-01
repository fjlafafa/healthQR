package Utils

import Impl.JacksonSerializable
import Types.Templates.{IDClass, NameClass}
import org.joda.time.DateTime
import slick.ast.BaseTypedType
import slick.jdbc.H2Profile.MappedColumnType
import slick.jdbc.JdbcType
import slick.jdbc.PostgresProfile.api._

import java.sql.Timestamp
import scala.reflect.ClassTag

object CustomColumnTypesUtils {
  implicit val jodaDateTimeType: JdbcType[DateTime] with BaseTypedType[DateTime] =
    MappedColumnType.base[DateTime, Timestamp](
      dt => new Timestamp(dt.getMillis),
      ts => new DateTime(ts.getTime)
    )

  implicit def listType[T](implicit tag: ClassTag[T]): JdbcType[List[T]] with BaseTypedType[List[T]] =
    MappedColumnType.base[List[T], String](
      a => {
        IOUtils.serializeList(a).get
      },
      a => {
        IOUtils.deserializeList[T](a).get
      }
    )

  implicit def jacksonSerializableType[T <: JacksonSerializable](implicit c: ClassTag[T]): JdbcType[T] with BaseTypedType[T] = {
    MappedColumnType.base[T, String](
      IOUtils.serialize(_).get,
      IOUtils.deserialize[T](_).get
    )
  }

  implicit def longType[T <: IDClass](implicit c: ClassTag[T]): JdbcType[T] with BaseTypedType[T] =
    MappedColumnType.base[T, Long](
      _.id,
      a => {
        c.runtimeClass.getConstructors.head.newInstance(a.asInstanceOf[Object]).asInstanceOf[T]
      }
    )

  implicit def stringType[T <: NameClass](implicit c: ClassTag[T]): JdbcType[T] with BaseTypedType[T] =
    MappedColumnType.base[T, String](
      _.name,
      a => {
        c.runtimeClass.getConstructors.head.newInstance(a.asInstanceOf[Object]).asInstanceOf[T]
      }
    )

}
