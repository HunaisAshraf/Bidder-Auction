import { WatchList } from "../../../entities/watchList";

export interface IWatchListRepository {
  get(user: string): Promise<WatchList[]>;
  add(auction: string, user: string): Promise<WatchList>;
  delete(id: string): Promise<void>;
}
