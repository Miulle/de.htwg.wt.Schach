package controllers

import javax.inject._
import play.api.mvc._
import de.htwg.se.ChinaSchach.ChinaSchach
import de.htwg.se.ChinaSchach.util.Point

@Singleton
class SchachController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
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
}