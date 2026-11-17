import { ArrowRight, Gamepad2, Server, SlidersHorizontal, Users } from "lucide-react";
import {
  GAME_SERVER_PRESETS,
  gameCatalogAvailability,
  gameCatalogConfiguration,
} from "../../../ui/lib/game-server-presets";
import { siteConfig } from "../config";

const otherGames = GAME_SERVER_PRESETS.filter((game) => game.gameId !== "minecraft");
const minecraftDeployUrl = `${siteConfig.newProjectUrl}?game=minecraft`;
const gameCatalogUrl = `${siteConfig.newProjectUrl}?category=games`;

export function GamingShowcase() {
  return (
    <section id="game-servers" className="section gaming" aria-labelledby="gaming-title">
      <div className="gaming-heading">
        <div>
          <p className="eyebrow">Game server hosting</p>
          <h2 id="gaming-title">Your Game. Your Server. Your Rules.</h2>
        </div>
        <div>
          <p className="gaming-lead">
            Host a Minecraft world or choose another supported game. DevHub helps you get your
            server running so you can focus on playing with friends.
          </p>
          <p>
            No complicated server setup. No infrastructure expertise required. Choose your game,
            customize your server, and let DevHub handle the hosting.
          </p>
        </div>
      </div>

      <article className="minecraft-feature">
        <div className="minecraft-art">
          <img
            src="/games/voxel-world.jpg"
            alt="Original voxel-art adventurers overlooking a forest, river, and player-built village."
          />
          <span className="art-label">Original voxel artwork</span>
        </div>
        <div className="minecraft-copy">
          <span className="status status-available">Featured guided preset</span>
          <h3>Minecraft Server Hosting</h3>
          <p className="minecraft-description">
            Create your own Minecraft world, invite your friends, and build something amazing
            together.
          </p>
          <ul className="minecraft-highlights">
            <li><SlidersHorizontal aria-hidden="true" size={17} /> Choose Vanilla or Paper, version, game mode, difficulty and world.</li>
            <li><Users aria-hidden="true" size={17} /> Set player capacity and requested memory.</li>
            <li><Server aria-hidden="true" size={17} /> Deploy through DevHub and copy the connection address when ready.</li>
          </ul>
          <a className="button button-primary gaming-primary-cta" href={minecraftDeployUrl}>
            Deploy Minecraft Server <ArrowRight aria-hidden="true" size={17} />
          </a>
          <small>
            Uses DevHub&apos;s existing Minecraft Java preset. Minecraft is a trademark of
            Microsoft; this experience is not affiliated with or endorsed by Microsoft or Mojang.
          </small>
        </div>
      </article>

      <div className="more-games-heading">
        <div>
          <p className="eyebrow">Supported presets</p>
          <h3>More Games. More Adventures.</h3>
          <p>Looking for something different? Explore our available game-server presets.</p>
        </div>
        <a className="button button-secondary" href={gameCatalogUrl}>
          <Gamepad2 aria-hidden="true" size={17} /> Explore Game Servers
        </a>
      </div>

      <div className="game-card-grid">
        {otherGames.map((game) => (
          <article className="game-card" key={game.gameId}>
            <div className="game-card-top">
              <span className="game-monogram" style={{ background: game.color }} aria-hidden="true">{game.tag}</span>
              <span className={`status ${gameCatalogAvailability(game) === "Guided preset" ? "status-available" : "status-development"}`}>
                {gameCatalogAvailability(game)}
              </span>
            </div>
            <h4>{game.name.replace(/ Server$/, "")}</h4>
            <p>{game.desc}</p>
            <small><strong>Configure:</strong> {gameCatalogConfiguration(game) || "Image and resource settings"}</small>
            <a href={`${gameCatalogUrl}&game=${encodeURIComponent(game.gameId ?? "")}`}>
              Configure in DevHub <ArrowRight aria-hidden="true" size={14} />
            </a>
          </article>
        ))}
      </div>
      <p className="gaming-availability-note">
        Presets provide guided configuration, not guaranteed capacity or game availability.
        Presets marked for host verification require direct multi-port ingress or prepared files
        before they can be ready to play.
      </p>
    </section>
  );
}
