import "./css/globals.css";
import Nav from "./_ui/Nav";
import Footer from "./_ui/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Lyricky",
  description: "Are you humming a tune but can’t quite remember the lyrics? Fear not! Lyricky is your trusty sidekick in the lyrical labyrinth. Get the lyrics of your song in a snap!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster
          position="top-center"
          toastOptions={{
            className: "",
            style: {
              border: "1px solid purple",
            },
          }}
        />

        <div className="container">
          <div></div>
          <main>
            <Nav />
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
