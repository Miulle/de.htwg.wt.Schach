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

import scala.concurrent.{ ExecutionContext, Future }
import scala.swing.Reactor

@Singleton
class SchachController @Inject()(cc: ControllerComponents) (implicit system: ActorSystem, mat: Materializer, ec: ExecutionContext) extends AbstractController(cc) {
  val gameController = ChinaSchach.controller
  def boardAsText = gameController.drawGameboard()

  def about= Action {
    Ok(views.html.index())
  }

  def schach = Action {
    Ok(views.html.schach(gameController))
  }

  def move (from1: Int, from2: Int, to1: Int, to2: Int) = Action {
    gameController.savePiecePoint(Point(from1, from2))
    gameController.getSelectedPoint(Point(to1, to2))
    Ok(gameController.gameToJson())
  }

  def restart = Action.async {
    gameController.reset()
    //Ok(views.html.schach(gameController))
    Future(Ok(views.html.chessVue(gameController)))
  }

  def gameToJson = Action {
    Ok(gameController.gameToJson())
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

  def offlineChess = Action {
    implicit request: Request[AnyContent] =>
      Ok(views.html.offlineChess())
  }

  def chessVue = Action.async {
    Future(Ok(views.html.chessVue(gameController)))
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