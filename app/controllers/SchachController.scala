package controllers

import javax.inject._
import play.api.mvc._
import de.htwg.se.ChinaSchach.ChinaSchach
import de.htwg.se.ChinaSchach.aview.Tui

@Singleton
class SchachController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
  val gameController = ChinaSchach.controller
  def boardAsText = gameController.drawGameboard()

  def about= Action {
    Ok(views.html.index())
  }

  def schach = Action {
    Ok(boardAsText)
  }
}