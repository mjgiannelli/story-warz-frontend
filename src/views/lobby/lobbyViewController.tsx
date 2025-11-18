import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSocketContext, OnlineUser } from "../../context/socketContext";
import { Book } from "../../App.interface";
import { CreateGameDTO } from "../../api/game/game.interface";
import { GameAPI } from "../../api/game/game.api";
import { UserDTO } from "../../api/user/user.interface";

interface GoogleBookVolumeInfo {
  title: string;
  authors?: string[];
  description?: string;
  imageLinks?: {
    thumbnail?: string;
    smallThumbnail?: string;
  };
  infoLink?: string;
}

interface GoogleBook {
  id: string;
  volumeInfo: GoogleBookVolumeInfo;
}

interface GoogleBooksApiResponse {
  items: GoogleBook[];
}

export const useLobbyViewController = (loggedInUserData: UserDTO) => {
  const { socket, onlineUsers, activeGames, currentGameId, createGameError, setCreateGameError, joinGame } =
    useSocketContext();
  const [showModal, setShowModal] = useState(false);
  const [topic, setTopic] = useState("");
  const [book, setBook] = useState<Book>();
  const [bookLoading, setBookLoading] = useState<boolean>(false);
  const [createGameLoading, setCreateGameLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!socket) return;

    const handlePlayerJoined = (user: OnlineUser) => {
      toast.success(`${user.displayName} joined the lobby`);
    };

    const handlePlayerLeft = (user: OnlineUser) => {
      toast.info(`${user.displayName} left the lobby`);
    };

    socket.on("playerJoined", handlePlayerJoined);
    socket.on("playerLeft", handlePlayerLeft);

    return () => {
      socket.off("playerJoined", handlePlayerJoined);
      socket.off("playerLeft", handlePlayerLeft);
    };
  }, [socket]);

  const handleCreateGame = async () => {
    setCreateGameLoading(true);
    setCreateGameError(null);
    try {
      // TODO: send to server to create game, and then send a message back
      console.log("socket: ", socket);
      socket?.emit("newGameCreated", {
        createdDate: new Date().toISOString(),
        topic: topic,
        creatorId: loggedInUserData?.id as string,
        players: [loggedInUserData],
        hostDisplayName: loggedInUserData.displayName,
        book: book,
      });
    } catch (err) {
      setCreateGameLoading(false);
      console.error("Error creating game:", err);
      toast.error("Failed to create game.");
    }
  };

  useEffect(() => {
    if (!currentGameId) return;
    toast.success("Game created successfully!");
    // Successfully created or joined a game
    setCreateGameLoading(false);
    setTopic("");
    setBook(undefined);
    setShowModal(false);
  }, [currentGameId]);

  useEffect(() => {
    if (!createGameError) return;
    toast.success("Error creating Game. Try again!");
    // Successfully created or joined a game
    setCreateGameLoading(false);
  }, [createGameError]);

  const retreiveGoogleBook = async () => {
    setBookLoading(true);
    try {
      const booksResp = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          topic
        )}`
      );

      const booksData: GoogleBooksApiResponse = await booksResp.json();

      if (!booksData.items || booksData.items.length === 0) {
        setBookLoading(false);
        console.log("No books found.");
        return;
      }

      // ✅ Find the first book with a non-null, non-empty thumbnail
      const bookWithThumbnail = booksData.items.find(
        (book) =>
          book.volumeInfo.imageLinks?.thumbnail &&
          book.volumeInfo.imageLinks.thumbnail.trim() !== ""
      );

      if (!bookWithThumbnail) {
        setBookLoading(false);
        console.log("No book with a thumbnail found.");
        return;
      }

      console.log(
        "📘 Book with thumbnail:",
        bookWithThumbnail.volumeInfo.title
      );
      console.log(
        "🖼️ Thumbnail:",
        bookWithThumbnail.volumeInfo.imageLinks?.thumbnail
      );
      const bookData: Book = {
        authors: bookWithThumbnail.volumeInfo.authors,
        description: bookWithThumbnail.volumeInfo.description as string,
        image: bookWithThumbnail.volumeInfo.imageLinks?.thumbnail,
        title: bookWithThumbnail.volumeInfo.title,
      };
      setBook(bookData);
      setBookLoading(false);
    } catch (err) {
      setBookLoading(false);
      console.error("Error fetching Google Books:", err);
    }
  };

  return {
    socket,
    onlineUsers,
    showModal,
    setShowModal,
    topic,
    setTopic,
    book,
    setBook,
    handleCreateGame,
    retreiveGoogleBook,
    bookLoading,
    createGameLoading,
    activeGames,
    joinGame,
    currentGameId,
  };
};
