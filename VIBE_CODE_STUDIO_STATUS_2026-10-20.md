# Vibe Code Studio — Trạng thái dự án

**Ngày tổng hợp:** 20/10/2026  
**Phiên bản source gần nhất:** v1.3 — Sprite Integration  
**Nguồn kiểm tra:** `agent-studio-sprites-integrated-v1.3.zip`, `agent-studio-real/src/main.ts`, `src/core.ts`, `README.md`, `ENGINE_CONTEXT (2).md`.  
**Trạng thái:** Đã có source tích hợp, **chưa xác nhận build / chạy thực tế với backend**.

## 1. Mục tiêu

Đồ họa hóa hoạt động AI agent khi vibe code thành một game quản lý studio phong cách pixel-art, camera **fixed isometric 2D**, lấy cảm hứng từ Game Dev Story. Agent là nhân vật có vị trí, sprite, hành vi và task tương ứng; giao diện có task board, progress và agent inspector.

## 2. Kiến trúc hiện tại

- **Backend có sẵn:** `server.mjs` cung cấp `GET /api/state` và `/api/health` tại cổng 7788. Đọc `.context/agents-live.json`; không render nhân vật.
- **Frontend:** PixiJS 8 + TypeScript + Vite. Renderer quản lý scene, actor, animation, HUD.
- **Polling:** 3 giây/lần trong Live Mode; giữ snapshot cuối khi lỗi kết nối.
- **Demo Mode:** state mẫu và nút NEXT EVENT để kiểm thử hành vi.
- **Agent FSM / movement:** logic reconciliation, vị trí đích theo role, A* grid route, hoạt ảnh di chuyển / làm việc / nghỉ bằng sprite và transform.
- **HUD:** thông tin project, layer, phase, counts, task columns, roster, inspector.

## 3. Artwork và sprite

- `public/assets/chars-generated/`: **19 PNG nhân vật mới**, tách từ artwork studio, được nạp trực tiếp trong `src/main.ts` bằng PixiJS `Assets.load()`.
- `src/main.ts` dùng `generatedTextures.get(name)` ưu tiên trước pose sprite cũ. Như vậy **sprite mới đã được nối vào renderer**, không chỉ làm ảnh minh họa.
- Roster cũng hiển thị ảnh từ `chars-generated`.
- `public/assets/chars/`: **114 PNG pose cũ** (19 nhân vật × 6 pose: stand, sit, walk0, walk1, work0, work1), vẫn được nạp và dùng làm fallback.
- `public/assets/decor/`: coffee, bookshelf, server, plant, sofa; một phần decor được cắt từ artwork tổng hợp.
- `public/assets/illustrated/`: concept studio và các ảnh atlas tham chiếu, **không phải** tile atlas sản xuất hoàn chỉnh.
- Phong cách UI: navy/cyan; cố gắng đồng bộ vùng scene với viền giao diện.

**Giới hạn đồ họa hiện tại:** 19 sprite mới chủ yếu là hình nhân vật tĩnh; hoạt ảnh đi / code / ngồi dùng di chuyển, lật, scale/bob. Chưa có bộ frame animation đa hướng vẽ riêng. Furniture còn pha trộn hình vẽ procedural và PNG decor, chưa phải một tilemap tách lớp hoàn chỉnh.

## 4. Nhân vật

19 nhân vật: Nova, Orion, Vega, Atlas, Comet, Lyra (builder); Sage, Iris, Juno, Echo (reviewer); Pixel (design); Captain (dispatcher); Eve (merger); Oracle (spec-validator); Sherlock (error-analyzer); Herald (spec-publisher); Scout (spec-init); Muse (brainstorm); Cartographer (graph).

Các trạng thái từ API: `building`, `review`, `merging`, `orchestrating`, `idle`, cùng cờ `stale`. `agents[]` đang làm việc, `benchAgents[]` rảnh. Tên agent được giữ ổn định qua polling.

## 5. Cấu trúc source

```text
agent-studio-real/
├── index.html
├── package.json
├── tsconfig.json
├── README.md
├── src/
│   ├── main.ts          # PixiJS, sprite, scene, HUD, polling
│   ├── core.ts          # State, demo, normalize, A*, destinations
│   └── style.css        # Giao diện
├── tests/
│   └── core.test.ts
└── public/assets/
    ├── chars/           # 114 pose sprites cũ
    ├── chars-generated/ # 19 sprite mới đã nối renderer
    ├── decor/           # Furniture/decor PNG
    ├── illustrated/     # Concept và reference atlases
    └── manifests/       # characters.json
```

## 6. Những gì đã triển khai trong code

- [x] PixiJS renderer và fixed isometric scene.
- [x] Demo / Live API, poll 3 giây.
- [x] Actor registry, reconciliation và fade in/out.
- [x] A* pathfinding trên grid và phân bổ vị trí đích.
- [x] Task HUD, roster, click-to-inspect.
- [x] Nạp 19 sprite mới vào actor renderer và roster.
- [x] Giữ 114 pose sprites cũ làm fallback.
- [x] Đồng bộ CSS HUD theo navy/cyan.
- [ ] Build/test được xác nhận trên máy chạy thực tế.
- [ ] Kiểm thử kết nối với backend thật và xử lý CORS.
- [ ] Animation sprite đa hướng, từng frame thực sự.
- [ ] Tilemap/furniture/occlusion sạch và đồng bộ hoàn toàn với concept.
- [ ] Kiểm thử độ chính xác vị trí, pathfinding và thứ tự lớp trên mọi asset.

## 7. Vấn đề / rủi ro đã biết

1. **Chưa xác minh build:** các lượt trước ghi nhận `npm install` timeout; chưa có kết quả `npm run build` và `npm test` thành công.
2. **CORS:** frontend chạy trên cổng Vite khác backend 7788; backend phải cho phép origin hoặc cấu hình reverse proxy.
3. **Artwork tách từ ảnh tổng hợp:** có thể có viền cắt, nền thừa, sai phối cảnh và độ nét; cần QA từng PNG.
4. **Không có event stream:** API chỉ cho snapshot nên không thể đảm bảo hiệu ứng task-completed/merge đúng thời điểm.
5. **Pathfinding:** A* tránh vật cản tĩnh; chưa có tránh va chạm động giữa các agent.
6. **Sai lệch phối cảnh:** scene code sử dụng isometric 2:1, không thể áp nguyên `office.jpg` cũ nếu chưa căn tọa độ.
7. **Sprite mới là single-pose:** thay texture thật nhưng chưa đạt chuẩn hoạt ảnh game hoàn chỉnh.

## 8. Chạy thử

Yêu cầu Node.js 20.19+ hoặc 22.12+ và npm:

```bash
unzip agent-studio-sprites-integrated-v1.3.zip
cd agent-studio-real
npm install
npm run dev
```

Vite hiển thị URL local (thường là `http://localhost:5173`). Chọn DEMO và NEXT EVENT để xem chuyển trạng thái; chọn LIVE API để kết nối backend tại `http://localhost:7788/api/state`.

Kiểm thử:

```bash
npm run build
npm test
```

Có thể truyền `?api=<encoded-url>` để thay endpoint.

## 9. Đầu việc ưu tiên tiếp theo

1. Chạy `npm install`, `npm run build`, `npm test`; sửa lỗi phát sinh và thử Demo/Live trong browser.
2. Kiểm tra 19 PNG mới thực sự trong suốt, căn chân, tỷ lệ và render đúng từng agent.
3. Tạo bộ **sprite sheets frame-by-frame** (idle, walk nhiều hướng, work, sit) đồng bộ nhân vật.
4. Thay furniture procedural / crop tạm bằng PNG tách lớp chuẩn; chỉnh depth sorting và occlusion.
5. Hiệu chỉnh map tọa độ, collision grid, chỗ ngồi và lối đi theo scene artwork.
6. Kiểm thử API thật, disconnect/reconnect, agent xuất hiện/biến mất, stale, task chuyển phase.
7. Sau khi kiểm thử đạt, mới đánh dấu production-ready.

## 10. Bàn giao / snapshot

- **Bản project gần nhất:** `agent-studio-sprites-integrated-v1.3.zip`.
- **File context API:** `ENGINE_CONTEXT (2).md`.
- **Tài liệu thiết kế trước đó:** `agent-studio-design/TECHNICAL_DESIGN.md`.

**Kết luận:** Đã có engine và code tích hợp 19 sprite mới trực tiếp vào PixiJS. Đây là **bản tích hợp chưa kiểm chứng chạy**, chưa phải bản hoàn thiện artwork/animation production. Không nên nhầm ảnh concept toàn cảnh với scene render động.
