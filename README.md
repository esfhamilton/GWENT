# A browser based platform for playing a multiplayer version of the card game GWENT (from the Witcher 3)

To run locally:

1. Run 'node server.js'
2. Open localhost:5000 in browser 

## Docker and Tailscale

Copy this project to a Docker-capable NAS. Create a `.env` file next to
`compose.yaml` containing `TS_AUTHKEY=your-tailscale-auth-key`; keep this file
private. Start the project with `docker compose up -d --build`, or use the
NAS Docker project interface with this directory as the build context. The
Tailscale container requires `/dev/net/tun` and network administration
capability. Approve the device in Tailscale if your network requires it.

Connect to `http://<tailscale-ip>:5000` from an authorised Tailscale device.
Share the `gwent` device with friends using Tailscale device sharing. The
Tailscale state volume preserves its identity across restarts; protect it and
do not delete it when updating the project. After registration, the auth key
can be removed from `.env`; preserve the state volume. Device key expiry may
still require reauthentication. Active games are lost when the server restarts.
