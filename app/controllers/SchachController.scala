package controllers

import javax.inject._
import play.api.mvc._
import de.htwg.se.ChinaSchach.ChinaSchach
import de.htwg.se.ChinaSchach.util.Point
import play.api.libs.streams.ActorFlow
import akka.actor.ActorSystem
import akka.stream.Materializer
import akka.actor._

@Singleton
class SchachController @Inject()(cc: ControllerComponents) (implicit system: ActorSystem, mat: Materializer) extends AbstractController(cc) {
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
    Ok(views.html.schach(gameController))
  }

  def restart = Action {
    gameController.reset()
    Ok(views.html.schach(gameController))
  }

  def gameToJson = Action {
    Ok(gameController.gameToJson())
  }

  def socket = WebSocket.accept[String, String] { request =>
    ActorFlow.actorRef { out =>
      println("Connect received")
      MyWebSocketActor.props(out)
    }
  }

  object MyWebSocketActor {
    def props(out: ActorRef) = {
      println("Object created")
      Props(new MyWebSocketActor(out))
    }
  }

  class MyWebSocketActor(out: ActorRef) extends Actor {
    println("Class created")
    def receive = {
      case msg: String =>
        out ! ("I received your message: " + msg)
        println("Received message "+ msg)
    }
  }
}