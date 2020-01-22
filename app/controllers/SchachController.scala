package controllers

import javax.inject._
import play.api.mvc._
import de.htwg.se.ChinaSchach.ChinaSchach
import de.htwg.se.ChinaSchach.util.Point
import play.api.libs.streams.ActorFlow
import akka.actor.ActorSystem
import akka.stream.Materializer
import akka.actor._
import de.htwg.se.ChinaSchach.controller.controllerComponent.Changed
import com.mohiva.play.silhouette.api.actions.SecuredRequest
import com.mohiva.play.silhouette.api.{ HandlerResult, Silhouette }
import com.mohiva.play.silhouette.api.repositories.AuthInfoRepository
import com.mohiva.play.silhouette.impl.providers.GoogleTotpInfo
import org.webjars.play.WebJarsUtil
import play.api.i18n.I18nSupport
import utils.auth.DefaultEnv

import models.User


import scala.concurrent.{ ExecutionContext, Future }
import scala.swing.Reactor

@Singleton
class SchachController @Inject()(
                                  components: ControllerComponents,
                                  silhouette: Silhouette[DefaultEnv],
                                  authInfoRepository: AuthInfoRepository
                                )(
                                  implicit
                                  webJarsUtil: WebJarsUtil,
                                  assets: AssetsFinder,
                                  system: ActorSystem,
                                  mat: Materializer,
                                  ec: ExecutionContext
                                ) extends AbstractController(components) with I18nSupport {
  val gameController = ChinaSchach.controller
  def boardAsText = gameController.drawGameboard()

  def about= Action {
    Ok(views.html.index())
  }

  def schach = silhouette.SecuredAction.async { implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
    authInfoRepository.find[GoogleTotpInfo](request.identity.loginInfo).map { totpInfoOpt =>
      Ok(views.html.schach(gameController, request.identity, totpInfoOpt))
    }
  }

  def move (from1: Int, from2: Int, to1: Int, to2: Int) = silhouette.SecuredAction.async { implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
    authInfoRepository.find[GoogleTotpInfo](request.identity.loginInfo).map { totpInfoOpt =>
      gameController.savePiecePoint(Point(from1, from2))
      gameController.getSelectedPoint(Point(to1, to2))
      Ok(gameController.gameToJson())
    }
  }

  def restart = silhouette.SecuredAction.async { implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
    authInfoRepository.find[GoogleTotpInfo](request.identity.loginInfo).map { totpInfoOpt =>
      gameController.reset()
      Future(Ok(views.html.chessVue(gameController)))
    }
  }

  def gameToJson = silhouette.SecuredAction.async { implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
    authInfoRepository.find[GoogleTotpInfo](request.identity.loginInfo).map { totpInfoOpt =>
      Ok(gameController.gameToJson())
    }
  }

  def socket = WebSocket.accept[String, String] { request =>
    ActorFlow.actorRef { out =>
      println("Connect received")
      SchachWebSocketActorFactory.create(out)
    }
  }

  def chessPolymer = Action {
    Ok(views.html.test())
  }

  def offlineChess = silhouette.UnsecuredAction.async { implicit request: Request[AnyContent] =>
      Ok(views.html.offlineChess())
  }

  def chessVue = silhouette.SecuredAction.async { implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
    authInfoRepository.find[GoogleTotpInfo](request.identity.loginInfo).map { totpInfoOpt =>
      Ok(views.html.chessVue(gameController, request.identity, totpInfoOpt))
    }
  }

  object SchachWebSocketActorFactory {
    def create(out: ActorRef) = {
      Props(new SchachWebSocketActor(out))
    }
  }

  class SchachWebSocketActor(out: ActorRef) extends Actor with Reactor{
    listenTo(gameController)


    def receive = {
      case msg: String =>
//        out ! (gameController.gameToJson.toString)
        println("Sent Json to Client"+ msg)
    }

    reactions += {
      case event: Changed => sendJsonToClient
    }

    def sendJsonToClient = {
      println("Received event from Controller")
      out ! (gameController.gameToJson.toString)
    }
  }
}