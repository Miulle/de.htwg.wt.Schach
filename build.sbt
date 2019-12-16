name := """HTWG Schach"""

version := "1.7"

lazy val root = (project in file(".")).enablePlugins(PlayScala, SbtWeb, SbtVuefy)

resolvers += Resolver.sonatypeRepo("snapshots")

scalaVersion := "2.12.8"

libraryDependencies += guice
libraryDependencies += "net.codingwell" %% "scala-guice" % "4.1.0"
libraryDependencies += "org.scalatest" %% "scalatest" % "3.0.4" % "chessVue"
libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "4.0.1" % Test
libraryDependencies += "com.h2database" % "h2" % "1.4.197"

// The commands that triggers production build when running Webpack, as in `webpack -p`.
Assets / VueKeys.vuefy / VueKeys.prodCommands := Set("stage")

// The location of the webpack binary. For windows, it might be `webpack.cmd`.
Assets / VueKeys.vuefy / VueKeys.webpackBinary := "./node_modules/.bin/webpack"

// The location of the webpack configuration.
Assets / VueKeys.vuefy / VueKeys.webpackConfig := "./webpack.config.js"

unmanagedResourceDirectories in Assets += baseDirectory.value / "node_modules"

Assets / VueKeys.vuefy / excludeFilter := "_*"

scalacOptions ++= Seq(
  "-feature",
  "-deprecation",
  "-Xfatal-warnings"
)
