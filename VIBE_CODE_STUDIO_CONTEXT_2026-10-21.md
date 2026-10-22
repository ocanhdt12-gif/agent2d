# VIBE CODE STUDIO — CONTEXT HANDOFF (2026-10-21)

Tài liệu bàn giao để tiếp tục ở phiên khác. Ghi lại **quyết định kiến trúc, asset đang có, toạ độ đã canh, prompt đã dùng, việc còn lại**.

## 0. Trạng thái ngay lúc này (cập nhật cuối 22/10/2026)

- Background chuẩn đã xong: không ghế, có 6 biển neon đúng chính tả.
- **Khu CODING xong phần art + animation:** đủ **6 builder** (Nova, Orion, Lyra, Vega, Atlas, Comet), mỗi người 10 pose, chạy trên trang test **`http://localhost:5173/coding-test.html`** (`npm.cmd run dev`). Toạ độ 6 chỗ, scale, thời lượng hành động, hiệu ứng đã chốt (mục 4, 8.4c, 8.4d).
- **Khu review: bỏ ghế trống**, chỉ hiện sprite reviewer có ghế bake khi active (chưa làm).
- `swivel_right` của Orion/Vega/Atlas/Comet xoay ít — **anh duyệt giữ nguyên, không sửa** (22/10). Khu coding coi như xong.
- **Đang làm: khu review** (22/10). Ghế review **nhỏ, lưng thấp** (tựa tới thắt lưng, ~70% footprint ghế coding, viền violet, không tay vịn). **Background đã thay (anh tự sửa, 22/10 11:07)**: giữ vách sticky-note + biển REVIEW sau bàn, màn hình vẫn quay xuống-trái, cảnh bên ngoài phía dưới thu hẹp → **lối đi dưới-trái bàn rộng hơn nhiều**. Reviewer ngồi lối đi đó, **lưng chéo 3/4 về camera, mặt hướng lên-phải** về màn hình (các phương án đảo hướng/lùi vách đã bỏ). Giữ 10 tên pose như coding. Prompt: mục 16 (16a ghế → 16b sheet Sage/Iris/Juno/Echo).
- Kiểm tra background mới: cùng 1496×1051; 6 neon đúng chữ; các khu ngoài review chỉ lệch nhiễu nhẹ (mean diff ~13/255, không dời chỗ); `coding-test.html` chạy, 6 builder vẫn khớp bàn phím → **không cần canh lại seat coding**. Bản cũ: `environment/office_original2.png`. `.claude/launch.json` đổi `npm.cmd` → `npm` cho macOS.
- **Ghế review đã có (22/10 11:18):** `furniture/chair_review.png` 1278×1230, alpha thật, bbox 886×1066 (x 229–1114, y 85–1150), anchor X **648** (tâm bánh dưới), lưng thấp viền violet. Ghép thử: `node scripts/preview-review-seats.mjs 70 -30 62` → `environment/review-seats-pilot.png` / `-zoom.png`. Ghế trống cao **70 px** (scale 0.0657).
  - Bàn phím review trên ảnh mới: (150,637), (239,697), (327,757), (422,820) → **seat R1–R4 CHỐT (lùi xa bàn, 22/10): (113,708), (202,768), (290,828), (385,891)** = bàn phím + (−37, +71) (bản thử trước (−30,+62) hơi đè bàn).
  - Lưu ý: mặt ghế chĩa sang **phải** (dọc theo bàn) hơn là lên-phải vào bàn → khi gen reviewer nhắc ghế xoay mặt lên-phải.
- **Anh duyệt ghép ghế review (22/10)** — dùng luôn, không gen lại hướng ghế. Tiếp: pilot 1 reviewer (Sage `straight_type_a`, prompt mục **16a-2**) lưu `public/assets/sage/review/straight_type_a.png` để căn scale/anchor trên R1–R4.
- **Pilot Sage đã có (22/10):** anh lưu `public/assets/characters/violet.png` (1024×1536, alpha sạch, bbox x 206–910, y 212–1409). Ghép: `node scripts/preview-review-sprite.mjs` → `environment/review-sprite-pilot.png` / `-zoom.png` (Sage ở R1, R3; ghế trống R2, R4). Thông số thử: **scale 0.110** → sprite **78×132 px** (ghế trong sprite ≈ ghế trống 70 px), anchor X **504** (tâm bánh dưới), anchor Y đáy bbox (1409); seat R1–R4 như trên. Tay chạm bàn phím, đúng hướng ghế.
- **Anh duyệt pilot Sage + vị trí (22/10)**, góp ý: **ghế nên xoay sang phải thêm chút** (~10–15°). Chốt khu review: đội reviewer **toàn nữ**, trang phục **nữ tính, thời trang** (không công sở); hành động **nhẹ nhàng, nữ tính** (gõ khẽ đầu ngón, không gõ ầm như dev), **không có swivel**. Bộ 10 pose review (prompt mục **16c**, thay 16b): `type_a/b` (gõ khẽ), `read_a/b` (tựa cằm đọc code), `note` (tick checklist trên tablet), `approve` (vỗ tay nhẹ LGTM), `talk_left/right`, `sip_tea`, `hair_tuck`. **Reviewer đầu tiên = SAGE, thiết kế lại** (anh chốt 22/10): tóc tím đậm thẳng dài tới eo, mái bằng, nơ nhung navy nhỏ, kính gọng mảnh; áo cổ lọ kem + cardigan plum ngắn cúc vàng; chân váy kẻ caro navy-plum xếp ly midi, tất đen mỏng, loafer đen khoá vàng; tách trà sứ trắng. Sprite cắt vào `public/assets/sage/review/`. Thiết kế **Violet** (tóc ombre lilac-hồng, len lilac tim sau lưng, váy tennis trắng) để dành cho reviewer sau. **Không gửi** `violet.png` cho GPT — chỉ `chair_review.png` + `review-seats-pilot-zoom.png`, tỷ lệ/góc mô tả bằng chữ.
- **Sheet Sage ĐÃ CẮT + GHÉP (22/10):** sheet gốc `public/assets/sage/review_sheet.png` (1536×1024, alpha thật) → 10 pose ở `public/assets/sage/review/` + `manifest.json` (`node scripts/build-coding-manifest.mjs sage 139 0.023 review` — script có thêm tham số `area`, pose chuẩn khu review = `type_a`; **scale 0.339**, type_a cao 139 px). Ghép QA: `environment/review-sage-pilot-zoom.png` (R1–R4: type_a, read_a, talk_right, sip_tea; `preview-review-sprite.mjs` nhận danh sách sprite cách nhau dấu phẩy). Ghế trong sheet đã xoay phải hơn pilot, cùng góc ở cả 10 hình.
  - ⚠ Khi cắt: khung nhãn GPT **dính sát bánh xe dưới** → `slice-pose-sheet.mjs` giữ lại nhãn; đã cắt bỏ thủ công (nhãn cao 42 px). Lần sau cần thêm bước bỏ nhãn vào script hoặc dặn GPT để khoảng trống lớn hơn dưới sprite.
- **Khu review đã chạy trên `coding-test.html` (22/10):** class `ReviewSeat` riêng trong `src/coding-test.ts` (không đụng logic coding). `REVIEWERS=['sage']`, `REVIEW_SEATS` R1–R4, ghế trống `chair_review.png` scale 0.0657 anchor (648, 1150). Hành động + trọng số × thời lượng: gõ khẽ `type` 30 × 5–10 s (type_a/b 2.5 fps), đọc `read` 28 × 6–12 s (read_a/b 0.6 fps), `note` 10 × 3–6 s, `approve` 6 × 2–3 s (bóng ✅), `talk_left/right` 9+9 × 3–6 s (chỉ khi R bên cạnh có người; trái = R phía trên-trái), `sip_tea` 7 × 3–5 s, `hair_tuck` 6 × 1.5–2.5 s; động tác 1 lần không lặp liền. Bóng thoại icon review (✅👀💜📝🐛☕✨👍🤔💬). Thanh nút **REVIEW** riêng để ép hành động; click ghế review: trống ↔ Sage. Đã kiểm tra trên trình duyệt: không lỗi console, `npm run build` pass.
  - `npm test`: 1 test cũ fail — `office-occlusion.test.ts` (mask `coding_desk_01_foreground.png` 1495×1052 từ 21/10, phương án mask đã bỏ) — không liên quan khu review; nên xoá test + asset mask khi dọn dẹp.
- **Anh duyệt khu review chạy thử (22/10).** Reviewer thứ 2 = **IRIS** (prompt mục **16d**): đính kèm sheet Sage làm mẫu tư thế/góc ghế; tóc hồng cam đuôi ngựa cao xù + nơ trắng, cardigan varsity hồng ngắn, váy xếp ly navy, sneaker trắng; trà sữa trân châu; dặn GPT chừa ≥ 40 px giữa bánh xe và nhãn.
- **Iris ĐÃ CẮT + CHẠY (22/10):** sheet `public/assets/iris/review_sheet.png` → `public/assets/iris/review/` (10 pose). Lần này slicer tự bỏ nhãn ở 8/10 ảnh; chỉ `note`, `read_a` còn dính nhãn → bỏ tay (kiểm tra bằng độ rộng các hàng đáy trước khi cắt, **đừng cắt nhãn mù** kẻo mất bánh xe).
  - **Quy tắc scale reviewer: chuẩn hoá theo GHẾ, không theo chiều cao tóc.** Đế bánh xe (hàng tối trong 45 hàng đáy) phải ≈ **74 px** trên màn hình. Sage type_a: đế 218 px nguồn, scale 0.339 (cao 139). Iris: đế 237 px, nên `build-coding-manifest.mjs iris 132 0.023 review` → scale 0.3121 (cao 132).
  - `REVIEWERS=['sage','iris']` (xếp xen kẽ R1–R4). QA: `environment/review-iris-pilot-zoom.png`; `preview-review-sprite.mjs` nhận `file.png@scale` cho từng sprite.
  - Lưu ý: ở cả 2 sheet, `talk_left` và `talk_right` đều quay mặt về phía phải ảnh (khác cử chỉ), bóng thoại do code đặt trái/phải — chấp nhận được.
- Reviewer thứ 3 = **JUNO** (prompt mục **16e**): hai bím tóc dài bạc-lavender + nơ xanh trời, mũ beret kem, kính tròn gọng vàng; váy yếm xanh trời (dây chéo sau lưng thắt nơ trắng) + áo blouse cổ ren; tất bèo trắng, mary-jane nâu nhạt; matcha đá. `hair_tuck` của Juno = đẩy kính.
- **Juno ĐÃ CẮT + CHẠY (22/10):** sheet `public/assets/juno/review_sheet.png` **không có alpha (caro vẽ cứng)** → slicer tự xoá caro, soi trên nền tối/hồng không thủng mảng trắng; nhãn đã tách sẵn cả 10 ảnh. `REVIEWERS=['sage','iris','juno']`.
  - **SỬA quy tắc scale:** đo lại theo bánh xe trước thì ghế trong 3 sheet **bằng nhau** (bản đo "đế ghế" trước đó lẫn giày → sai). **Mọi reviewer dùng chung scale ≈ 0.339** (Sage 0.339, Iris 0.3381, Juno 0.3382 — manifest dựng bằng displayHeight = 0.339 × chiều cao bbox type_a). Iris trước bị thu nhỏ oan (0.3121) — đã sửa. QA so sánh: `environment/review-compare.png`.
- **Sửa Juno bị mờ/vỡ (22/10):** 2 nguyên nhân — (1) game thu nhỏ ~3× bằng `nearest` → mất 8/9 pixel, chi tiết mảnh vỡ lấm tấm; (2) xoá caro để lại viền xám-trắng. Cách sửa: `node scripts/clean-fringe.mjs 2 public/assets/juno/review/*.png` (xoá pixel sáng, ít màu nằm ở mép, 2 lượt; bản gốc chưa dọn không giữ trong repo) + trong `coding-test.ts` sprite khu review nạp bằng `loadSmooth` (mipmap + linear) thay cho nearest — áp cho **mọi reviewer**. So sánh: `environment/juno-before-after.png`. **Sheet nào không có alpha (caro vẽ cứng) thì luôn chạy `clean-fringe.mjs` sau khi cắt.**
- Reviewer thứ 4 = **ECHO** (prompt mục **16f**), **đổi style 22/10: bỏ tông tím (trùng Sage) → đen/xám than + xanh mint**: tóc bob đen ngang cằm có lớp trong nhuộm mint, headphone trắng tai mint phát sáng; hoodie xám than ngắn logo sóng âm mint sau lưng, váy xếp ly trắng viền mint, tất đùi đen, sneaker trắng đế mint; móc khoá con bọ mint; bình giữ nhiệt trắng nắp mint. Bảng màu đội review: Sage tím · Iris hồng cam · Juno lavender + xanh trời · Echo đen + mint. `hair_tuck` của Echo = chỉnh headphone. Đủ 4 reviewer theo Bible (Violet để dành, ngoài roster).
- **Echo ĐÃ CẮT + CHẠY (22/10) → ĐỦ 4 REVIEWER:** `REVIEWERS=['sage','iris','juno','echo']`, scale Echo 0.3382. Sheet Echo cũng caro vẽ cứng + **quầng sáng nhạt dưới ghế nối bánh xe với nhãn** → nhãn dính 10/10 ảnh.
  - **Quy trình cắt reviewer chuẩn (dùng cho mọi sheet sau):**
    1. `sips -s format png <sheet.webp> --out public/assets/<ten>/review_sheet.png`
    2. `node scripts/slice-pose-sheet.mjs public/assets/<ten>/review_sheet.png public/assets/<ten>/review 5 2 type_a type_b read_a read_b note approve talk_left talk_right sip_tea hair_tuck`
    3. `node scripts/drop-label.mjs public/assets/<ten>/review/*.png` — tự bỏ nhãn dính bánh xe (dò hàng chỉ còn bánh trước; nếu quầng sáng loang thì dò khối nhãn đặc ≥100 px/hàng, xoá pixel nhạt 18 hàng trên nhãn, bỏ đốm < 40 px); ảnh không có nhãn để nguyên.
    4. Nếu sheet không có alpha: `node scripts/clean-fringe.mjs 2 public/assets/<ten>/review/*.png`
    5. Soi contact sheet trên nền tối: bánh xe dưới phải tròn (hàng đáy rộng ~8–14 px), không cắt bằng.
    6. Manifest scale 0.339: `node scripts/build-coding-manifest.mjs <ten> 139 0.023 review` rồi chạy lại với displayHeight = round(0.339 × chiều cao bbox type_a).
  - QA đủ đội: `environment/review-team-zoom.png`. Trang test chỉ chạy hoạt ảnh khi khung trình duyệt đang hiện (bị ẩn thì rAF dừng, log trống — không phải lỗi).
- **Hiệu ứng khu REVIEW (22/10, anh duyệt làm cả 4, vẽ bằng code + emoji, chưa cần sprite):** trong `ReviewSeat.updateFx` (`src/coding-test.ts`). Màu nhấn riêng `REVIEW_COLORS`: Sage #b98cff, Iris #ff8fb3, Juno #8ec5ee, Echo #5fe3b8. Màn hình = seat + `MONITOR` (50, −100).
  1. **Glyph review bay lên** từ màn hình khi `read` (mỗi 0.9 s) / `type` (0.65 s): ✓ ? // ✗ … +1, tô màu reviewer.
  2. **🔍 Bug Hunt** (`bug_hunt`, trọng số 3 × 3.5–4.5 s ≈ 2.5% — "siêu tốc" của đội review; pose read_a/b 1.5 fps + rung nhẹ): kính lúp quét màn hình → 1.6 s màn hình nháy đỏ + 🐛 bật ra + "FOUND!" → 2.5 s bọ xẹp, bung ✨⭐; glyph ra dày (0.22 s), 40% là ✗ đỏ.
  3. **LGTM**: `approve` → con dấu **APPROVED** viền mint đập xuống trên đầu (0.15 s, scale 2→1, nghiêng −0.2 rad) + ✨💜 (thay bóng ✅ cũ).
  4. **Approval wave**: khi 1 người approve, những người khác vỗ tay (pose approve 1.1 s + 💜✨) lần lượt cách 350 ms/ghế; người đang approve/bug hunt thì bỏ qua; vỗ tay không lan tiếp.
  - Thanh REVIEW có nút **Bug Hunt 🔍**. Trang test có móc debug `window.__test={app,seats,reviewSeats}` để tua khung hình khi khung trình duyệt bị ẩn (rAF dừng). QA: `environment/review-fx-bughunt.png`, `review-fx-approve.png`, `review-fx-wave.png`.
  - Prompt sheet icon FX pixel-art (tuỳ chọn, thay emoji): mục **17** file prompt.
- **Anh duyệt hiệu ứng review (22/10).** Thứ tự tiếp: **Eve (Merge)** → Captain (Dispatcher, bàn PLAN) → 8 agent idle (sofa).
- **Eve — prompt mục 18 (sửa 22/10): Eve ĐỨNG làm việc, KHÔNG ghế** (anh yêu cầu — thể hiện rõ người quản lý). Đứng trên thảm xanh trước bàn Merge, cùng góc nhìn reviewer (lưng chéo 3/4, mặt lên-phải); cao ≈ 1.15× sprite reviewer ngồi (gồm ghế). Ngoại hình: tóc lavender ánh cyan búi đôi + đuôi dài, blazer trắng ngắn có ký hiệu merge sau lưng, váy xếp ly gradient cyan→tím, bốt trắng, cầm tablet. 10 pose dùng chung tên: type_a/b gõ khi đứng nghiêng về bàn, read_a/b tay chống hông xem màn hình, note vuốt hologram, approve nắm tay "merged!", talk chỉ đạo, sip_tea cầm cốc một tay kẹp tablet, hair_tuck = khoanh tay giám sát. Anchor = giữa hai bàn chân. Asset `public/assets/eve/merge/`. Ảnh tham chiếu `environment/merge_area_reference.png`. Không có ghế/ghế trống ở Merge.
- **Eve ĐÃ CẮT + CHẠY (22/10).** Anh tự chỉnh lại ngoại hình → **thiết kế Eve chuẩn (theo sheet `public/assets/eve/merge_sheet.png`)**: tóc bob ngắn tím than ánh xanh-tím, kẹp tóc tam giác phát sáng, khuyên tai xanh; áo khoác hologram óng ánh trễ vai, áo hai dây trắng, quần short xám bạc, đai đùi, túi tròn robot ở hông, bốt trắng-bạc; ĐỨNG (không ghế). (Mô tả búi đôi/blazer trong prompt mục 18 không còn đúng.)
  - Sheet có alpha thật; 4 ảnh hàng 1 dính nhãn qua vệt mảnh → cắt ở hàng hẹp < 40 px dưới chân (⚠ không dùng `drop-label.mjs` cho sprite đứng — nó dò bánh xe; và đừng dùng "độ rộng ≥100 ở đáy" để đoán có nhãn: chân đứng cũng rộng >100).
  - Manifest khu `merge`: ~~158 px / 0.348~~ → anh thấy to; **chốt `node scripts/build-coding-manifest.mjs eve 146 0.023 merge` → scale 0.3216, type_a cao 146 px** (đầu hiển thị ≈ 62 px, ngang builder 58–63 / reviewer 55–66). Pose chuẩn khu ≠ coding là `type_a` (script đã sửa). Anchor = giữa hai bàn chân.
  - **Chỗ đứng chốt: (1265, 505)** (đã dịch phải 20 px theo anh; bản đầu (1245, 505)) trên thảm xanh trước bàn phím chính (~(1285, 425)). QA: `environment/merge-eve-pilot-zoom.png`, `merge-eve-fx.png`.
  - Code: `ReviewSeat` nhận `Station` (vị trí, pool nhân vật, có ghế hay không, monitor offset, chiều cao đầu, chữ con dấu, lead). `MERGE_STATION`: không ghế, monitor (45, −118), head 162, con dấu **MERGED**, `lead` → luôn được nói, không bug hunt, **approve của Eve làm cả 4 reviewer vỗ tay** (cách 350 ms). Màu FX Eve #7fe9ff. Thanh REVIEW ép hành động cho cả Eve. Mọi khu ≠ coding nạp sprite bằng mipmap (`loadSmooth`).
- **FX Eve + hào quang (22/10):**
  - **⚡ Merge Rush** (`merge_rush`, chỉ Eve, trọng số 4 × 3.5–4.5 s; pose note/type_a/note/type_b 3 fps + rung): nhánh sáng cong từ màn hình mọi người đang làm (6 builder: seat + (10, −125), màu #7fe4ff; reviewer: màu riêng) chạy về quả cầu hologram `GLOBE` (1320, 378); "gói commit" (chấm trắng viền màu) chạy dọc nhánh 0.7 s, mỗi 110 ms một gói; quả cầu phát vòng sóng cyan mỗi 380 ms; glyph dày. **Hết Rush → tự chuyển approve** (MERGED + đội review vỗ tay). Vẽ trong lớp `topFx` (trên mọi nhân vật). Nút **Merge Rush ⚡** trên thanh REVIEW.
  - **Hào quang** (giống lửa của đội code, sau lưng nhân vật): Eve lúc Merge Rush = điện cyan + 8 kim cương xoay + 3 tia sét đổi mỗi 70 ms; reviewer lúc Bug Hunt = glow mềm màu riêng + 6 sao nhỏ xoay. Glow = 8 elip đồng tâm alpha ~0.04 (KHÔNG dùng blend `add` — trên sàn sáng bị trắng xoá, viền cứng).
  - QA: `environment/merge-rush-office.png`, `aura-eve-iris.png`. Prompt sprite hào quang tuỳ chọn: mục **19** (merge_aura cho Eve, focus_aura trắng để tint cho reviewer).
- **Khu PLAN (22/10): bỏ tên Captain → planner NAM, tên tạm THEO** (anh yêu cầu đổi tên + phong cách planner). Prompt mục **20**: Theo **đứng** trên thảm trước bàn kế hoạch gỗ (không ghế, giống Eve), cùng góc nhìn Review/Merge; tông amber/kem/nâu: tóc nâu hạt dẻ rẽ ngôi gọn, bút chì cài tai, kính tròn đồi mồi, gile len kem cáp + sơ mi xanh nhạt xắn tay, dây túi đeo chéo có sticky note, quần chino xanh rêu, giày da nâu, clipboard; cốc cà phê amber. Pose: type_a/b viết giấy, read_a/b đọc clipboard, note dán sticky lên bảng, approve "plan locked!", hair_tuck suy nghĩ + rút bút chì. Ảnh tham chiếu `environment/plan_area_reference.png`; asset `public/assets/theo/plan/`; chỗ đứng ước lượng (787, 317).
- **Theo ĐÃ CẮT + CHẠY (22/10):** sheet `public/assets/theo/plan_sheet.png` (alpha thật) → `public/assets/theo/plan/`. Ngoại hình theo sheet: tóc nâu xù bồng, bút chì cài tai, kính, gile len kem, sơ mi xanh nhạt, túi da đeo chéo có sticky note, quần xanh rêu xắn gấu, giày da nâu.
  - 7/10 ảnh dính nhãn → cắt kiểu sprite đứng (dò từ đáy, **bỏ qua 4 hàng đầu** vì góc bo khung nhãn hẹp, rồi cắt ở hàng hẹp < 40 px).
  - Manifest: `node scripts/build-coding-manifest.mjs theo 140 0.023 plan` → **scale 0.3241, cao 140 px** (tóc bồng nên thấp hơn Eve 146 để đầu ≈ 63 px, ngang mọi người).
  - **Chỗ đứng chốt (770, 332)** trên thảm trước đầu trái bàn PLAN. `PLAN_STATION`: solo (không ghế, luôn được nói, không bug hunt), không kích hoạt vỗ tay đội review, monitor/giấy (32, −60), head 156, con dấu **PLANNED** màu amber #ffb35c, glyph riêng ☐ ☑ → 1. 2. 3. ✓, màu FX #ffb35c. QA: `environment/plan-theo-fx.png`.
- **FX Theo — 💡 Idea Storm (22/10)** (`idea_storm`, chỉ trạm có `board`; 4.2–4.8 s; pose hair_tuck→note→read_b→note→type…): bóng đèn 💡 bật trên đầu (có tia sáng amber), 6 sticky note màu bay vòng cung từ đầu lên bảng, dán thành hàng chéo (`board` (62, −118), bước (17, −8)), xong nối mũi tên amber thành roadmap + bảng sáng; hào quang amber với sticky note nhỏ xoay quanh; glyph dày. **Hết → tự approve PLANNED.** Nút **Idea Storm 💡**. QA `environment/plan-theo-ideastorm.png`.
- Bóng đèn Idea Storm: **vẽ pixel bằng code** (`BULB_MAP` 11×14, 2 px/ô, viền nâu đậm, kính vàng + bóng trắng, đuôi xoáy xám) thay emoji 💡 (emoji nhạt trên tường sáng); đặt ngay trên đỉnh đầu Theo (−2, −h+6). QA `environment/plan-theo-bulb.png`.
- **Tăng tần suất đỉnh FX (anh yêu cầu):** `PEAK_BOOST=6` nhân trọng số merge_rush / idea_storm → đo mô phỏng 10 phút: Eve Merge Rush 11% + approve 8.5%, Theo Idea Storm 12% + approve 8.7% (≈ 20% thời gian có hiệu ứng, trước ~2.5%). Muốn nhiều/ít hơn: chỉnh `PEAK_BOOST`.
- **ROSTER CHỐT (22/10, anh duyệt): 15 nhân vật** — 6 builder, 4 reviewer, Eve, Theo, Pixel, Oracle, **Sherlock** (giữ lại sau). Bỏ Captain/Muse/Cartographer/Scout/Herald (gộp như bảng dưới). Pixel làm việc một mình ở khu Relax; Oracle đứng khu Plan cạnh Theo.

  **Bảng quy đổi role → nhân vật** (dùng khi nối `/api/state`; role không có trong bảng → Theo):

  | Role backend | Nhân vật hiển thị | Khu |
  |---|---|---|
  | builder | Nova, Orion, Lyra, Vega, Atlas, Comet | Coding |
  | reviewer | Sage, Iris, Juno, Echo | Review |
  | error-analyzer | Sherlock | Review (đứng sau đội reviewer, quay mặt ra) |
  | merger | Eve | Merge |
  | dispatcher (Captain — bỏ) | Theo | Plan |
  | brainstorm (Muse — gộp) | Theo | Plan |
  | graph (Cartographer — gộp) | Theo | Plan |
  | design | Pixel | Relax (chỗ làm việc riêng) |
  | spec-validator | Oracle | Plan (đứng cạnh Theo, quay mặt ra) |
  | spec-init (Scout — gộp) | Oracle | như Oracle |
  | spec-publisher (Herald — gộp) | Oracle | như Oracle |

  Nhiều agent cùng role gộp vào 1 nhân vật (vd brainstorm + graph cùng lúc) → nhân vật đó hiện 1 lần; HUD/inspector vẫn liệt kê đủ agent.
- **Pixel — prompt mục 21 (sửa 22/10): khu Relax = chỗ LÀM VIỆC RIÊNG của Pixel, một mình** (anh yêu cầu; không còn là sofa idle chung). Ngồi đoạn trái sofa, **chính diện chéo 3/4 (thấy mặt)**, sprite không vẽ sofa, seat ước lượng (1190, 785). Phong cách designer: tóc wolf-cut xanh băng lớp trong hồng + bút cài tóc, kính tròn gọng trong, headphone tai mèo ở cổ, cardigan len vàng chanh trễ vai + áo crop in vòng màu RGB, quần jean ống rộng dính sơn, sneaker đế dày dây cầu vồng; bảng vẽ, laptop dán sticker, quạt mẫu màu. 10 pose: sketch_a/b, laptop_a/b, swatch, approve (khoe bản thiết kế), think, talk, sip_tea, stretch. Con dấu dự kiến DESIGNED. Asset `public/assets/pixel/relax/`.
- **Pixel ĐÃ CẮT + CHẠY (22/10):** sheet `public/assets/pixel/relax_sheet.png` (1500×1000, alpha thật) → `public/assets/pixel/relax/` (sketch_a/b, laptop_a/b, swatch, approve, think, talk, sip_tea, stretch).
  - Nhãn dính cả 10 ảnh; 5 ảnh khung nhãn chạm giày → dùng cách "khối nhãn có độ rộng không đổi" (đi lên từ đáy khi span ±6 px so với hàng −10, cắt cách 2 hàng) + gọt 1–3 hàng sót. ⚠ Cách "hàng hẹp < 40" cắt hỏng khi nhãn dính liền giày.
  - Manifest khu `relax`, pose chuẩn `sketch_a` (script đã thêm): `node scripts/build-coding-manifest.mjs pixel 112 0.023 relax` → **scale 0.2563, cao 112 px** (ngồi, không ghế; đầu ≈ 62 px). **Chỗ ngồi (1205, 813)** = điểm giữa hai bàn chân trên sofa đoạn trái.
  - Code: `RELAX_STATION` (solo, không ghế, monitor/bảng vẽ (12, −62), head 112, con dấu **DESIGNED** hồng #ff8fd0, glyph ✦ ◆ ● ✎ # px ◐). Station có `alias` map tên pose chung → file của Pixel: type→sketch, read→laptop, note→swatch, hair_tuck→stretch, talk_left/right→talk.
  - **🎨 Color Burst** (`color_burst`, đỉnh FX của Pixel, ×PEAK_BOOST, 3.8–4.4 s; pose think→swatch→sketch…): giọt sơn 7 màu bắn ra từ bảng vẽ rơi theo trọng lực, cầu vồng 7 dải mọc dần trên đầu, 5 thẻ mẫu màu xoè quanh người, hào quang chấm 7 màu; hết → approve DESIGNED. Nút **Color Burst 🎨**. (Lỗi đã sửa: `arc` của Pixi nối nét từ điểm bút cũ → luôn `moveTo` điểm đầu cung.) QA `environment/relax-pixel-fx.png`.
- **Oracle — prompt mục 22 (22/10, anh chốt):** nữ, QA nghiêm khắc kiểu tsundere, **đứng ở khu Plan cạnh Theo (bên phải), QUAY MẶT về người xem** (nhìn xuống khu Coding), cầm clipboard + bút đỏ check và **mắng dev**. Ngoại hình: tóc navy đậm buộc đuôi ngựa cao, mái bằng, kính chữ nhật gọng đỏ; blazer navy ngắn viền đỏ + huy hiệu tick đỏ, sơ mi trắng nơ đỏ mảnh, chân váy xếp ly navy, tất đen, bốt đen; thẻ "QA"; cốc cà phê đen. 10 pose: check_a/b, glare_a/b (đẩy kính, lườm), scold (chỉ bút đỏ hét), approve (hiếm hoi mỉm cười), talk (quay sang Theo), sigh (ôm trán), sip_tea, hair_tuck (khoanh tay nhịp chân). Chỗ đứng ước lượng (850, 345). Asset `public/assets/oracle/plan/`. Đỉnh FX dự kiến **📢 Code Review Roast** (hét "FIX IT!" về khu Coding, builder giật mình, ✗→✓, con dấu VALIDATED).
- **Oracle ĐÃ CẮT + CHẠY (22/10):** sheet `public/assets/oracle/plan_sheet.png` (alpha thật) → `public/assets/oracle/plan/` (check_a/b, glare_a/b, scold, approve, talk, sigh, sip_tea, hair_tuck).
  - Nhãn dính 10/10 + còn 2–3 hàng viền nhãn liền dưới bốt → bỏ bằng tỷ lệ phủ hàng (hàng nhãn: số pixel > 80% span; hàng bốt có khe giữa 2 chân) + `despeck` blob < 400 px.
  - **Lỗi GPT:** pose `approve` vẽ lẫn tay áo len VÀNG của Pixel → đã tô lại thành navy (pixel ấm r−b>40, g>0.45r, b<0.6g trong khung tay áo). So sánh `environment/oracle-approve-sleeve-fix.png`. Vai trần vẫn còn (nhỏ, chấp nhận).
  - Manifest: `node scripts/build-coding-manifest.mjs oracle 138 0.023 plan check_a.png` (script nhận thêm tham số pose chuẩn) → **scale 0.3007, cao 138 px**. **Chỗ đứng (868, 372)**: trước bàn PLAN bên phải Theo, quay mặt ra, nhìn xuống khu Coding.
  - `ORACLE_STATION`: solo, alias type→check, read→glare, note→scold, talk_*→talk; monitor/clipboard (−4, −70), head 138, con dấu **VALIDATED** đỏ #ff5a6e, glyph ☐ ☑ ✗ ! ? ✓.
  - **📢 Code Review Roast** (`roast`, ×PEAK_BOOST, 3.8–4.2 s; glare→scold×4→sigh→check): 1.0 s chữ "FIX IT!" bật + rung trên đầu; dấu "!" đỏ bay vòng cung tới từng builder (lệch 60 ms); chạm thì builder **giật mình** (rung, nhảy 1–2 px, 💦❗ trên đầu) 2.2 s, hết thì bật **✓ xanh** (đã sửa). Hết Roast → approve VALIDATED. `Seat` (coder) có `startleUntil` + `spawnFix()`. Nút **Roast 📢**. QA `environment/plan-oracle-roast.png`.
- **Sherlock — prompt mục 23 (22/10, anh đổi ý: GIỮ Sherlock, tạo riêng):** nam, thám tử bug; **đứng sau lưng đội reviewer (trên sàn giữa hàng ghế review và lan can), quay mặt ra người xem**, trầm ngâm ghi log bug. Ngoại hình: tóc đỏ cam dựng rối, mũ thám tử deerstalker xám than, áo trench dài xám than lót cam + vạch cảnh báo đỏ cam ở tay, cổ lọ đen, bốt da nâu; sổ log bug, bút, kính lúp đồng đeo thắt lưng; cốc giấy cà phê. 10 pose: log_a/b, ponder_a/b, inspect (kính lúp), approve (đóng sổ "case closed"), talk (quay sang reviewer), eureka ("AHA!"), sip_tea, hair_tuck (chỉnh vành mũ). Chỗ đứng ước lượng (195, 825). Asset `public/assets/sherlock/review/`. Đỉnh FX dự kiến **🧵 Root Cause** (bọ đỏ bay từ màn hình reviewer, nối chỉ đỏ hội tụ trên đầu → AHA! → ✓ → con dấu SOLVED).
- **Sherlock ĐÃ CẮT + CHẠY (22/10):** sheet `public/assets/sherlock/review_sheet.png`; 2 hàng sheet dính nhau (không có hàng trống) → cắt lưới thủ công tại y = 502 (`SPLIT=502`), rồi bỏ nhãn (khối độ rộng + tỷ lệ phủ hàng + despeck). Manifest `node scripts/build-coding-manifest.mjs sherlock 138 0.023 review log_a.png` → scale 0.2981, cao 138. **Chỗ đứng (440, 1012)** (chỉnh lại 22/10, trước (428, 1000)) — góc tường chữ V phía dưới khu review (anh yêu cầu, bản (160, 830) đè lan can), quay mặt ra. QA `environment/review-sherlock-corner.png`.
  - ⚠ **Lỗi GPT:** pose `approve` + `talk` vẽ lẫn **đuôi tóc dài navy của Oracle** (nằm chồng lên áo, không tách sạch bằng code) → tạm alias approve→eureka, talk_*→log_b. Cần gen lại 2 pose (prompt mục 23b).
  - `SHERLOCK_STATION`: solo, alias type→log, read→ponder, note→inspect; con dấu **SOLVED** cam #ff8a3d; glyph 🐛 ? # ! … ✓.
  - **🧵 Root Cause** (`root_cause`, ×PEAK_BOOST, 4.2–4.6 s; inspect→ponder→eureka): 🐛 bay lên từ màn hình mỗi reviewer, chỉ đỏ nối về ghim trên đầu Sherlock; 1.6 s bị kéo dần vào ghim; 3.0 s "AHA!" + bọ thành ✅; hết → approve SOLVED. Nút **Root Cause 🧵**. QA `environment/review-sherlock-rootcause.png`.
- **Nâng cấp icon + FX review (22/10, anh góp ý icon xấu, đội review thiếu FX):**
  - **Bỏ toàn bộ emoji** (mờ, mỗi hệ điều hành một kiểu) → bộ **icon pixel-art vẽ bằng code** `src/pixel-icons.ts` (heart, heart_v, star, sparkle, check, cross, bug, coffee, question, exclaim, fire, drop, laugh, note, chat, idea): bản đồ chữ cái + bảng màu, `buildIcons(renderer)` sinh texture 1 px/ô nearest, `iconSprite(name,size)` / `setIcon`. Dùng cho bóng thoại (TALK_ICONS/REVIEW_ICONS = tên icon), hạt bay (`spawn` nhận tên icon), bọ Bug Hunt/Root Cause, ✓ sửa bug, 💦❗ khi bị Roast. Mọi `Text` render `resolution:3` (chữ sắc nét), chữ glyph đổi font tròn đậm có viền.
  - **FX reviewer:** Bug Hunt cũng nhân `PEAK_BOOST` (giờ ~20% thời gian như các nhân vật khác); **thẻ diff code** (dòng xanh/đỏ, viền màu reviewer) bật từ màn hình mỗi 1.3 s khi đọc, bay lên rồi đóng dấu ✓ (75%) hoặc ✗; approve/vỗ tay bung tim + sao pixel nhiều hơn. QA `environment/review-fx-v2.png`, `icons-pixel-v2.png`.
- **GitHub (22/10):** repo công khai https://github.com/ocanhdt12-gif/agent2d, nhánh `main` (commit đầu 0cc7ea5). Máy đã đăng nhập `gh` tài khoản ocanhdt12-gif. `.gitignore` bỏ node_modules, dist, dist-deploy, .claude, .vercel.
- **Deploy Vercel (22/10):** https://vibe-code-studio-zeta.vercel.app (project `vibe-code-studio`, tài khoản Vercel của anh, công khai). Build gọn: `node scripts/build-deploy.mjs` (dùng `vite.deploy.config.ts`, chỉ `coding-test.html` + ảnh cần dùng → `dist-deploy/` ~64 MB, `vercel.json` rewrite `/` → `/coding-test.html`) rồi `cd dist-deploy && npx vercel deploy --prod --yes --name vibe-code-studio`. Lần đầu tải trang mất ~10–20 s (nạp toàn bộ ảnh trước khi vẽ; riêng `nova/coding` 15 MB) — **đã thêm màn hình loading** (22/10: `#loading` trong `coding-test.html` — chữ VIBE CODE STUDIO, 4 ô màu nhảy, thanh tiến độ %; mỗi texture qua `tick()` cộng tiến độ, manifest cộng số pose vào tổng; nạp xong thì mờ dần 0.5 s). Anh **không muốn nén ảnh** (từ chối cài sharp). Xem thử local: preview `deploy-preview` (cổng 5180).
- **PHƯƠNG ÁN IDLE (22/10, đang đề xuất — thử trước với Pixel):** idle = ngồi ghế/sofa có sẵn trong background (sprite KHÔNG vẽ ghế), không đi bộ, đổi chỗ bằng fade. Bản đồ slot: `environment/idle-slots-cafe.png`, `idle-slots-relax.png` (toạ độ ước lượng, canh khi ghép).
  - **Slot:** Cafe — C1 ghế trái bàn A (178,393) quay lưng↗ · C2 ghế dưới bàn A (245,405) quay lưng↖ · C3 ghế trái bàn B (325,328) quay lưng↗ · C4 ghế phải bàn B (415,305) chính diện↙ · C5 đứng quầy pha cà phê (232,282) quay lưng↖ · C6 đứng quầy bánh (120,318) quay lưng↖. Relax — R1 sofa trái (1150,795)↘ · R2 góc sofa (1262,776)↓ · R3 sofa phải (1335,800)↙ · R5 pouf cam (1075,866)↘ · R6 pouf xanh (1145,896)↘ · R7 ghế đôi dưới (1330,926) quay lưng↖ · R8 đứng cây nước (1418,862) quay lưng↗. (R4 bỏ — trúng bàn nhỏ.) P (1205,813) = chỗ làm việc của Pixel.
  - **4 hướng chỉ cần 2 bộ ảnh + lật ngang:** chính diện↘ (lật → ↙), quay lưng↖ (lật → ↗).
  - **Sheet idle 5×2 mỗi nhân vật (đề xuất):** hàng 1 ngồi chính diện↘: sit_relax, sit_drink, sit_phone, sit_laugh, sit_doze · hàng 2: sit_back_drink, sit_back_talk (ngồi quay lưng↖), stand_order, stand_sip (đứng quay lưng↖), stand_chat (đứng chính diện↘ cầm cốc).
  - **Không đè nhau:** mỗi slot giữ chỗ (1 người), bán kính chặn 55 px (R1 xung đột P khi Pixel làm việc); chỗ làm việc luôn ưu tiên.
  - **Hành vi idle đề xuất:** đi lấy cà phê (C5 → fade về bàn cầm cốc), tán gẫu khi 2 người cùng bàn/sofa, ngủ gật trên pouf + Zzz, buôn chuyện ở cây nước, lấy bánh ở quầy, chơi game điện thoại ("WIN!"), giờ giải lao chung khi ≥3 người rảnh (cụng ly ☕), (tuỳ chọn) mèo văn phòng nằm sofa.
- **IDLE — anh chốt (22/10):** C5 có 2 pose (đứng pha cà phê quay lưng + đứng uống quay mặt ra); **ghế cafe C1–C4 bake vào sprite** để đè khít ghế background. Soi lại hướng ghế: **C2, C4 quay mặt ra ↙; C1, C3 quay lưng nhìn bàn ↗** (khác bảng slot ban đầu). Sheet idle **6×2 = 12 pose** (prompt mục **24**, thử với Pixel): sit_relax/drink/phone/laugh/doze (sofa, chính diện↘, không ghế), sit_back (ghế đôi R7, quay lưng↖), chair_front_drink/talk (ghế C2/C4), chair_back_drink/talk (ghế C1/C3), stand_brew (quầy, quay lưng↖), stand_drink (đứng, quay mặt ra↘). Ảnh tham chiếu mới: `environment/cafe_chair_reference.png` (ghế C2 + C1), `cafe_area_reference.png`.
- **ĐỦ 15 NHÂN VẬT trên trang test** (6 builder, 4 reviewer, Eve, Theo, Oracle, Pixel). Việc kế tiếp: (c) chuyển logic `coding-test.ts` vào scene runtime thật + nối `/api/state` theo bảng quy đổi role; dọn test/asset cũ (office-occlusion test fail).
- **Việc kế tiếp:** (a) ~~cắt Juno + Echo~~ xong; tiếp theo → cắt → manifest theo cỡ ghế → thêm vào `REVIEWERS`, cắt + manifest khu review, ghép R1–R4, rồi Iris/Juno/Echo, rồi gen sheet 4 reviewer (16b), thêm tham số khu cho `build-coding-manifest.mjs`, **đo toạ độ R1–R4 mới** ở lối đi rộng khi lắp sprite; (b) merge (Eve), dispatcher (Captain), sofa idle; (c) chuyển logic `coding-test.ts` vào scene runtime thật + nối `/api/state`.
- Prompt ChatGPT: `VIBE_CODE_STUDIO_ANIMATION_PROMPTS.md` (mục 13 = mẫu re-skin chuẩn, mục 14–15 = mẫu prompt độc lập, mục 16 = khu review).
- Máy hiện tại: **macOS**, Node v26.5.0 → dùng `npm run dev` (không cần `npm.cmd`).

### 0b. Chạy tiếp trên MÁY MỚI

1. Giải nén `vibe-code-studio_2026-10-22.zip` (đã bỏ `node_modules/`, `dist/`) vào một thư mục, ví dụ `C:\Users\<ban>\Documents\db`.
2. Cài **Node.js 24** (máy cũ: Node v24.14.1, npm 11.11.0).
3. Trong thư mục dự án (PowerShell):
   ```powershell
   npm.cmd install
   npm.cmd run dev
   ```
   Mở `http://localhost:5173/coding-test.html` để xem khu coding (6 builder).
4. Mở Claude Code trong thư mục đó và nhắn:
   > Đọc `VIBE_CODE_STUDIO_CONTEXT_2026-10-21.md` và `VIBE_CODE_STUDIO_ANIMATION_PROMPTS.md`, rồi làm tiếp từ mục 0.
5. Memory của Claude **không đi theo máy** — mọi thứ cần biết đã nằm trong 2 file trên. Quy ước làm việc với anh: mỗi khi chốt gì (toạ độ, scale, prompt, quyết định) thì **ghi ngay vào file context**; ảnh mới từ ChatGPT luôn soi contact sheet trước khi lắp (GPT hay lưu nhầm/trùng file, vẽ caro cứng, swivel không xoay).
6. Ảnh sheet gốc ChatGPT gửi qua chat (Orion, Lyra, Vega, Atlas, Comet) **không nằm trong dự án** — chỉ còn bản đã cắt trong `public/assets/<builder>/coding/`. Muốn cắt lại thì phải gửi lại sheet.

---

## 1. Mục tiêu

Game quản lý studio AI agent, phong cách pixel-art isometric cố định, dữ liệu lấy từ `/api/state` (demo + live), HUD hiển thị task board / roster / inspector.

**Bản hiện tại là bản dựng lại (rebuild)**, không dùng lại scene procedural cũ trong `src/main.ts`. Art đang được sản xuất lại từ đầu.

---

## 2. Quyết định kiến trúc đã chốt

1. **Giữ PixiJS 8 + TypeScript + Vite.** Không chuyển sang Phaser/Godot.
2. **Background là một ảnh tĩnh duy nhất**, không tilemap, không pathfinding, **không cho nhân vật đi lại**.
3. **Ghế làm việc bake vào sprite nhân vật** (người + ghế trong cùng file) — không dùng lớp che, không mask.
4. **Background không có ghế** ở mọi chỗ làm việc. Đã gen lại và thay `office_original.png`.
5. **Khu review không đặt ghế trống.** Chỉ khi có reviewer đang làm việc mới hiện sprite (đã bake ghế review). Ghế trống hiện chỉ còn ở 6 bàn coding.
6. **Sofa/relax không cần ghế riêng** (sofa quay mặt ra ngoài, không che nhân vật).
7. **Cafe/bàn ăn không dùng làm chỗ ngồi của agent.** Chỉ trang trí. Idle dùng sofa.
8. Mỗi agent chỉ có 3 nhóm hành động: `work` (gõ phím), `talk_left` / `talk_right` (quay sang nói), `idle` (ngồi sofa).
9. Trạng thái đổi → **fade ngắn + đổi vị trí**, không mô phỏng đi bộ.
10. `agents[]` = đang làm việc; `benchAgents[]` = idle. Poll 3 giây, giữ snapshot cuối khi lỗi.

### Vì sao không dùng lớp che (foreground mask)

Đã thử nhiều lần và thất bại vì hình học của ảnh:

- Tựa lưng trong background **hẹp hơn thân nhân vật** (~38 px so với 45–55 px).
- Đưa tựa lưng lên trước → ghế cắt ngang lưng/đầu nhân vật.
- Để nhân vật phía trước → tựa lưng biến mất.
- Ghế asset rời + che lên ghế nền → vẫn lộ ghế cũ, và ghế đè người khi scale lớn.

Kết luận: bake cả người + ghế, background sạch ghế là hướng duy nhất không lỗi.

---

## 3. Asset hiện có

### Background
| File | Kích thước | Trạng thái |
|---|---|---|
| `public/assets/environment/office_original.png` | **1496 × 1051**, RGB (không alpha) | **Bản chuẩn hiện tại (thay 22/10, khu review rộng hơn)** — đã bỏ toàn bộ ghế làm việc, có neon text: CAFE, PLAN, CODING, REVIEW, MERGE, RELAX |

### Ghế
| File | Trạng thái |
|---|---|
| `public/assets/furniture/chair_coding.png` | Ghế coding, **1254×1254**, phần vẽ 843×992, alpha thật. Đã duyệt kiểu dáng. |
| `public/assets/furniture/chair_review.png` | Ghế review (1254×1254, alpha thật) — **chỉ dùng làm tham chiếu để vẽ ghế trong sprite reviewer**, không đặt làm ghế trống. ⚠ Lúc chốt Nova (21/10) file này **không còn trong thư mục** — cần khôi phục nếu dùng làm tham chiếu |
| `chair_merge`, `chair_dispatcher` | **CHƯA CÓ** — sẽ dùng cùng chuẩn |

### Nhân vật
| File | Trạng thái |
|---|---|
| `public/assets/characters/nova.png` | **1122×1402**, RGBA thật, đã duyệt: nhìn từ sau, lưng thẳng, tay hướng trước, **chưa có ghế** |
| `public/assets/furniture/nova_chair_coding.png` | **Nova + ghế coding baked**, 1122×1402, RGBA thật, phần vẽ 684×1212 (bbox x 250–933, y 99–1310). **Đã duyệt** trên 6 chỗ coding (mục 4) |
| ~~`public/assets/characters/nova_work.png`~~ | Không tạo file này — sprite đã duyệt được lưu thành `furniture/nova_chair_coding.png` ở trên |
| `public/assets/<builder>/coding/*.png` + `manifest.json` | **Bộ animation đang dùng** cho 6 builder `nova, orion, lyra, vega, atlas, comet` — 10 pose mỗi người (mục 8.4d) |
| `public/assets/fx/fire_aura.png` | Vầng lửa gõ siêu tốc, 1024×1536, dùng chung mọi nhân vật |
| `public/assets/chars/` | 114 pose cũ (legacy fallback) |
| `public/assets/chars-generated/` | 19 ảnh minh hoạ cũ (legacy) |
| `public/assets/characters-extracted/` | Bộ cắt từ `agent_sprites_TRUE_TRANSPARENT` (thử nghiệm, không dùng) |

### Tham chiếu / QA
| File | Mục đích |
|---|---|
| `environment/chair_coding_reference.png` | Cắt ghế coding từ background cũ, phóng 5× |
| `environment/review_chair_reference.png` | Cắt khu review bench, phóng 3× |
| `environment/nova-pose-reference.png` | Ghế + bàn + bàn phím để gen Nova đúng phối cảnh |
| `environment/chair-code-pilot.png` | QA: 1 ghế coding trên background |
| `environment/chairs-coding-pilot.png` | **QA: 6 ghế coding đã canh** (trạng thái ghế trống) |
| `environment/review-chairs-pilot.png` | QA cũ của phương án ghế review trống — **đã bỏ, không dùng** |
| `environment/seat-map-debug.png` | Ảnh lưới toạ độ 100 px + nhãn số, để tra (x,y) |
| `environment/chair-seat-empty.png`, `chair-seat-pilot.png` | QA cũ (cách ghế asset rời) — không dùng nữa |

---

## 4. Toạ độ & tỷ lệ đã canh

### Ghế coding (6 chỗ)
- **Scale hiển thị (ĐÃ CHỐT, khớp ghế trong sprite Nova):** `0.08` → mỗi ghế trống **67 × 79 px**. (Bản cũ 0.095 / 80×94 px đã bỏ.)
  - Không dùng 0.115 cho `chair_coding.png`: file ghế trống có phần vẽ to hơn ghế trong sprite Nova (843 px so với ~595 px), nên 0.115 sẽ ra ~97 px. 0.08 là scale quy đổi để hai ghế trông cùng cỡ.
- **Anchor X:** `628` px trong `chair_coding.png` = tâm bánh giữa. **Anchor Y:** đáy bbox (y = 1156).
- **Offset X:** `−20` px, **giống Nova** → ghế trống và sprite có người đứng đúng cùng một chỗ, đổi qua lại không bị nhảy.
- Toạ độ ghế bên dưới là **toạ độ seat gốc**; vị trí đặt thực tế = seat + offset (−20, 0).
- QA: `environment/chairs-coding-pilot.png` (6 ghế trống); `nova-coding-pilot*.png` khi chạy `node scripts/preview-nova-coding.mjs 0,2,4` (trộn Nova + ghế trống).
- Toạ độ seat (x, y) — **đã duyệt**:

| Dãy | Ghế 1 | Ghế 2 | Ghế 3 |
|---|---|---|---|
| Trên | (553, 530) | (746, 530) | (945, 530) |
| Dưới | (566, 695) | (763, 695) | (962, 695) |

### Khu review (4 chỗ) — KHÔNG còn ghế trống
- Ghế review đã bị bỏ khỏi kế hoạch render ghế trống; chỉ hiện sprite reviewer **có ghế bake** khi đang làm việc.
- Toạ độ neo (điểm chạm sàn giả định) đã canh, dùng làm vị trí đặt sprite:

| Ghế | Toạ độ |
|---|---|
| R1 | (152, 696) |
| R2 | (232, 742) |
| R3 | (312, 788) |
| R4 | (392, 826) |

- Nếu sau này có sprite reviewer: canh theo các mốc trên; ghế review trong sprite nên cao **~86 px** (nhỏ hơn ghế coding) hoặc 94 px nếu muốn đồng bộ.
- **Chốt 22/10:** ghế review là kiểu **nhỏ, lưng thấp** (prompt mục 16a); background mới có lối đi rộng dưới-trái bàn, reviewer **quay lưng về camera, mặt hướng lên-phải**. Toạ độ R1–R4 bên trên là của bố cục cũ → **đo lại** khi lắp sprite. Sprite lưu `public/assets/<reviewer>/review/`.
- `environment/review-chairs-pilot.png` là ảnh QA cũ (có ghế trống) — **không còn dùng**.

### Nhân vật
- Nova `nova.png` (không ghế) ở **scale 0.10** → cao ~154 px, rộng ~90 px.
- **Không vẽ thêm ghế trống ở chỗ đã có sprite ngồi** (tránh 2 ghế chồng).

### Nova + ghế coding baked (`furniture/nova_chair_coding.png`) — ĐÃ CHỐT
- File gốc 1122×1402, phần vẽ 684×1212 (bbox x 250–933, y 99–1310).
- **Scale:** `0.115` → hiển thị **79 × 139 px** (ghế trong sprite rộng ~62 px).
- **Anchor X:** `555` px trong file gốc = tâm đế ghế (bánh giữa), **không** dùng tâm bbox vì chân phải thò sang phải.
- **Anchor Y:** đáy bbox (y = 1310) = điểm chạm sàn của đế ghế.
- **Offset:** X `−20` px so với toạ độ ghế coding, Y = 0 (để ngồi ngay trước bàn phím).
- Công thức: `originX = seatX − 20 − (555 − bboxLeft) × 0.115`, `originY = seatY − bboxHeight × 0.115`.
- Toạ độ đặt thực tế (sau offset): trên (533, 530), (726, 530), (925, 530); dưới (546, 695), (743, 695), (942, 695).
- Dãy trên đã đẩy lên từ y 560 → **530** để bánh ghế không đè lên màn hình dãy dưới; dãy dưới đẩy lên 717 → **695** và sang phải **+10 px** (22/10) để tay chạm bàn phím. Vẫn vẽ dãy trên trước, dãy dưới sau.
- QA: `environment/nova-coding-pilot.png`, `nova-coding-pilot-zoom.png`; script `scripts/preview-nova-coding.mjs`.
- Mọi frame/nhân vật coding khác phải **cùng canvas, cùng tỷ lệ** với file này để dùng chung scale 0.115 + anchor.
- ⚠ **Runtime hiện tại KHÔNG dùng file này nữa**: trang test dùng bộ pose `public/assets/<builder>/coding/` + `manifest.json` — mỗi nhân vật có scale riêng (đưa `straight_type_a` về cao **139 px**) và anchor tự đo (tâm bánh giữa, đáy bbox). Toạ độ seat + offset −20 giữ nguyên.

### Quy ước file sprite nhân vật
- Canvas **336 × 420** cho mọi frame.
- Trong canvas: nhân vật cao **~310 px** (đáy giày → đỉnh tóc), ghế cao **~188 px**, cả hai đặt trên **cùng đường sàn y = 400**, tâm x = 168.
- Hiển thị trong game ở **scale 0.5** → nhân vật ~155 px, ghế ~94 px.
- ⚠ Thực tế file Nova đã chốt là canvas **1122×1402** (không phải 336×420) và hiển thị ở scale 0.115 → ~139 px. Frame mới nên theo file đã chốt; nếu chuyển sang 336×420 thì phải tính lại scale/anchor.
- Không vẽ bóng sàn, không text, không nền caro. Alpha thật (góc ảnh alpha = 0).

---

## 5. Trạng thái source hiện tại

- `src/main.ts`: **vẫn là scene procedural cũ** (tiles, cube furniture, 19 sprite minh hoạ). Chưa nối background mới / ghế / Nova mới.
- **`src/coding-test.ts` + `coding-test.html`**: trang test khu coding (PixiJS, không đụng `main.ts`) — background + 6 seat, ghế trống khi không có người, 6 builder, chọn hành động ngẫu nhiên có trọng số, crossfade, lửa, ký tự code, bóng thoại icon, `TUNING` riêng từng nhân vật, nút ép hành động, click ghế đổi người. Đây là **bản mẫu logic** để chuyển vào scene runtime thật.
- `.claude/launch.json`: cấu hình `vite-dev` (port 5173) để mở preview.
- `src/core.ts`: state, normalize, A*, destination — vẫn dùng được, nhưng **phần A*/destination sẽ bị bỏ** khi làm scene mới.
- `tests/`: `core.test.ts` (7 test) + `office-occlusion.test.ts` (1 test) đang chạy; `sprites.test.ts` và `extracted-sprites.test.ts` **tự skip** nếu asset thử nghiệm không tồn tại.
- `npm.cmd run build` và `npm.cmd test` đang pass.

### Chạy trên Windows PowerShell
`npm` bị chặn policy → dùng **`npm.cmd`**.

```powershell
npm.cmd run dev
npm.cmd run build
npm.cmd test
```

Vite proxy `/api` → `http://localhost:7788` (dev + preview). Backend `server.mjs` **không có trong repo này**.

---

## 6. Script tiện ích

| Script | Việc |
|---|---|
| `scripts/png-rgba.mjs` | Decode/encode PNG RGBA thuần Node (hỗ trợ RGB & RGBA, filter 0–4) |
| `scripts/slice-pose-sheet.mjs` | **Cắt sheet pose** (lưới cols×rows, nhãn dưới mỗi hình) thành từng PNG; bỏ nhãn chữ; tự tách nền nếu sheet không có alpha (nền magenta, hoặc caro vẽ cứng). `<sheet.png> <outDir> <cols> <rows> <tên…>` |
| `scripts/build-coding-manifest.mjs` | Đo bbox + anchor từng pose, ghi `public/assets/<builder>/coding/manifest.json`; cảnh báo 2 file gần trùng. `[character=nova] [displayHeight=139] [footFraction=0.023]` |
| `scripts/preview-coding-chairs.mjs` | Ghép 6 ghế trống coding; tham số `[scale=0.08] [anchorX=628] [offsetX=-20]` |
| `scripts/preview-nova-coding.mjs` | Ghép khu coding: Nova (0.115/555) ở chỗ có người, ghế trống (0.08/628) ở chỗ còn lại, cùng offset −20; tham số `[occupied=0,1,2,3,4,5]` |
| `scripts/preview-review-chairs.mjs` | Ghép ghế review dọc bàn review (thử xoay/lật) — khu review đã bỏ ghế trống, giữ để tham khảo |
| `scripts/preview-nova-seat.mjs` | Ghép Nova vào 1 ghế, tham số scale/x/y/mask |
| `scripts/preview-chair-seat.mjs` | Ghép ghế + Nova (cách cũ) |
| `scripts/extract-office-occlusion.mjs` | Tạo mask che — **không dùng nữa** |
| `scripts/generate-sprites.mjs` | Sinh sprite pixel thủ công — **thử nghiệm, đã bị loại** |
| `scripts/extract-agent-sprites.mjs` | Cắt pose board — **thử nghiệm, đã bị loại** |

Chạy ví dụ:

```powershell
node scripts/preview-coding-chairs.mjs
node scripts/preview-nova-coding.mjs 0,2,4
# thêm 1 builder mới từ sheet ChatGPT (ảnh .webp đổi sang .png trước):
node scripts/slice-pose-sheet.mjs sheet.png public/assets/<ten>/coding 5 2 straight_type_a straight_type_b lean_left_type_a lean_left_type_b lean_right_type_a lean_right_type_b talk_left talk_right swivel_left swivel_right
node scripts/build-coding-manifest.mjs <ten>
# rồi thêm '<ten>' vào CHARACTERS trong src/coding-test.ts
```

Đổi `.webp` sang `.png` trên Windows (không cần cài gì) — dùng WIC qua PowerShell `PresentationCore`: `BitmapDecoder` → `FormatConvertedBitmap(Bgra32)` → `PngBitmapEncoder` (giữ alpha).

---

## 7. Việc còn lại (thứ tự ưu tiên)

1. ✅ Lưu sprite Nova + ghế: `furniture/nova_chair_coding.png`.
2. ✅ Ghép Nova vào 6 ghế coding: chốt scale 0.115, anchor X 555, offset X −20 px (mục 4).
3. ✅ Animation làm việc khu coding: 10 pose × **6 builder** + hiệu ứng, chạy trên `coding-test.html` (mục 8.4c–d).
3b. ✅ `swivel_right` Orion/Vega/Atlas/Comet — anh duyệt giữ nguyên (22/10).
3c. ⏳ Pose `idle_sofa` cho builder (ngồi sofa, không ghế) — chưa làm.
4. **Gen 4 reviewer** với ghế review bake (dùng `chair_review.png` làm tham chiếu, neo theo toạ độ R1–R4).
5. **Merge + Dispatcher**: 1 sprite mỗi chỗ (Eve, Captain), ghế bake.
6. **8 agent idle** (Oracle, Sherlock, Herald, Scout, Muse, Cartographer, Pixel + 1): sprite ngồi sofa.
7. **Viết lại scene runtime**: PixiJS, một ảnh background, sprite theo `seat-map`, HUD HTML giữ nguyên.
8. Nối API thật, kiểm tra disconnect/stale/agent xuất hiện–biến mất.
9. Cập nhật README, xoá code/asset thử nghiệm không dùng.

### Bảng ghế dự kiến

| Khu | Số ghế | Cách render |
|---|---:|---|
| Coding | 6 | Ghế trống `chair_coding` khi rảnh; sprite có ghế khi có builder |
| Review | 4 | **Không có ghế trống**; chỉ sprite reviewer có ghế khi active |
| Merge | 1 | Sprite Eve có ghế khi active |
| Dispatcher | 1 | Sprite Captain có ghế khi active |
| Sofa relax | 4–6 | Không ghế riêng; sprite idle ngồi sofa |
| Cafe | 0 | Chỉ trang trí |

---

## 8. Prompt đang dùng

### 8.1 Background (đã xong)

Yêu cầu chính: giữ nguyên bố cục ảnh cũ, **bỏ toàn bộ ghế làm việc + ghế quầy cafe**, dựng lại sàn dưới mỗi bàn, giữ neon text đúng 6 chữ `CAFE / PLAN / CODING / REVIEW / MERGE / RELAX`.

### 8.2 Ghế coding (đã xong)

- Tham chiếu: `chair_coding_reference.png` + `office_original.png`.
- Kết quả: canvas lớn, alpha thật, neon rim light ấm + bounce cyan, đế 5 bánh.

### 8.3 Ghế review — ĐÃ GEN, chỉ dùng làm tham chiếu

`chair_review.png` đã có. Kết quả kiểm tra: **ảnh gốc đúng hướng**, không cần xoay (đã thử ±26.6° và mirror đều sai). Ghế này **không đặt làm ghế trống** nữa; chỉ dùng làm mẫu để vẽ ghế trong sprite reviewer.

### 8.4 Sprite nhân vật có ghế — ĐÃ DUYỆT với Nova

Nguyên tắc: **một file chứa cả người + ghế**, không vẽ bàn/màn hình/sàn/bóng. Ghế trong sprite phải khớp model ghế của khu vực.

Prompt đã dùng cho `nova_work` (kết quả đã duyệt):

```text
Create ONE game-ready sprite of Nova SEATED IN HIS OFFICE CHAIR, seen from
behind at the fixed isometric camera of IMAGE 3.

IMAGE 1: Nova identity — spiky cobalt-blue hair, cyan headset with microphone,
navy tech jacket with cyan trim, dark trousers, sneakers.
IMAGE 2: the exact chair to draw — same model, same navy seat, same dark metal
frame, same five-star wheel base, same cyan trim.
IMAGE 3: the office, for camera angle, lighting and colour.

COMPOSITION — one single sprite containing BOTH the character AND the chair:
- rear three-quarter view, back of the head and back of the jacket toward camera
- straight spine, shoulders level, head not turned, face not visible
- sitting centred on the chair, thighs forward, knees bent, both feet flat on
  the floor, forearms reaching toward an invisible keyboard
- the chair backrest frames the body: visible on both sides of the torso and
  reaching roughly the character's lower back
- both armrests and the full five-star wheel base visible, nothing cropped

CANVAS AND SIZE:
- canvas 336 x 420 px, transparent RGBA
- character height from shoe soles to hair tip: about 310 px
- chair height from wheel base to top of backrest: about 188 px
- chair width about 160 px
- both the character's soles and the chair's wheel base rest on the same floor
  line at y = 400
- sprite horizontally centred on x = 168
- a few transparent pixels of margin on every side

STYLE:
Crisp pixel-art clusters, dark navy outlines, matching IMAGE 3. Warm amber rim
light from the upper left, faint cyan bounce from the monitors on the right.
No smooth 3D shading, no glossy gradient, no blur.

OUTPUT:
One PNG with genuine transparent alpha.
NO desk, NO monitors, NO keyboard, NO floor, NO cast shadow, NO text, NO labels,
NO frame, NO checkerboard, NO second chair, NO second character.
```

Negative: `empty chair only, chair without person, person without chair, floating chair, desk, monitors, keyboard, mouse, floor, room, cast shadow, fake checkerboard, front view, face visible, turned head, standing, legs straight and together, duplicated chair, extra chair, extra limbs, cropped wheels, cropped hair, text, label, frame, 3D render, smooth vector, blurry pixels, watermark`.

Biến thể:
- Reviewer: thay IMAGE 2 bằng `chair_review.png`, giữ nguyên khung 336×420.
- `talk_left/right`: giữ hông/chân/ghế, chỉ xoay đầu + vai 35–45°.
- `idle_sofa`: ngồi sofa, không ghế.

### 8.4b Animation làm việc — prompt sửa ảnh ChatGPT

Toàn bộ prompt từng tư thế (straight / lean_right / type_b / talk_left/right / swivel_left/right / fire aura) ở **`VIBE_CODE_STUDIO_ANIMATION_PROMPTS.md`**.

Kế hoạch: ít ảnh gen (~10 ảnh/nhân vật), chuyển động nhỏ làm bằng code:
- Gõ bình thường / nhanh / siêu tốc = cùng 2 frame tay A/B, chạy ~4 / ~10 / ~18 fps; siêu tốc thêm rung 1 px + `fx/fire_aura` (hiệu ứng riêng, dùng chung mọi agent).
- Tư thế nền: `lean_left` (= master hiện tại), `straight`, `lean_right` — chọn ngẫu nhiên mỗi phiên làm việc.
- `talk_left/right`, `swivel_left/right`: 1 ảnh mỗi cái, sửa từ `straight`; chuyển cảnh bằng fade ~120 ms.
- Chọn hành động ngẫu nhiên có trọng số mỗi 3–8 giây; nói chuyện chỉ khi ghế bên cạnh có người; lệch pha giữa các agent.
- Ảnh ChatGPT ra 1024×1536 → cần script căn lại theo bánh xe giữa về canvas/anchor của master.

### 8.4c Bộ animation Nova đợt 1 — đã lắp chạy thử

- Ảnh ở `public/assets/nova/coding/*.png` (1024×1536, alpha thật) + `public/assets/fx/fire_aura.png`.
- `node scripts/build-coding-manifest.mjs` → `public/assets/nova/coding/manifest.json`: bbox + anchor (tâm bánh giữa = trung bình x 30 hàng đáy, y = đáy bbox) cho từng pose; scale chung **0.1071** (`straight_type_a` cao 139 px như master). Chạy lại mỗi khi thêm/đổi ảnh.
- Trang test: **`npm.cmd run dev` → `http://localhost:5173/coding-test.html`** (`src/coding-test.ts`). Có nút ép hành động (gõ thường/nhanh/siêu tốc, nói, xoay) và click ghế để thêm/bớt người.
- Thời lượng (giây) × trọng số chọn hành động — **gõ phím ~82%, nói chuyện ~13.5%** (chỉnh 22/10 cho đỡ nhàm; trung bình ~7 s đổi hành động, nói chuyện ~35 s/lần khi 2 bên có người):

| Hành động | Trọng số | Thời lượng | ~% thời gian |
|---|---:|---|---:|
| Gõ thường | 50 | 6–14 s | 62% |
| Gõ nhanh | 18 | 5–10 s | 17% |
| Gõ siêu tốc 🔥 | 5 | 3–5 s | 2.5% |
| Nói trái / phải | 12 + 12 | 3–6 s | 13.5% (chỉ khi bên cạnh có người) |
| Xoay trái / phải | 8 + 7 | 2–3 s | 4.5% |

- Bóng thoại khi nói: icon ngẫu nhiên đổi mỗi 0.9–1.5 s (💡🐛☕✅❓🔥🚀😂👍📦🤔⚡, không lặp icon liền kề), bóng nhấp nhô 1 px. Sửa ở `TALK_ICONS` / `ICON_MS` trong `src/coding-test.ts`.
- Đã chạy được: gõ 4/10/18 fps, ký tự code bay lên khi gõ nhanh, lửa chập chờn + rung 1 px khi siêu tốc, nói chuyện có bong bóng (chỉ khi ghế cùng hàng bên cạnh có người), xoay ghế, crossfade 120 ms.
- Vấn đề asset:
  - Bộ ChatGPT nhìn ghế **thẳng từ sau**, master nhìn **chéo 3/4** → không trộn master vào; trang test chỉ dùng bộ mới.
  - Thiếu `lean_left_type_a` → lean_left chỉ có 1 frame, code nhún vai 1 px thay.
  - Đợt 4 (22/10): anh thay cả `lean_left_type_a` + `lean_left_type_b` (cùng góc nhìn thẳng từ sau) → **bộ 10 pose đủ, không còn loại trừ**; mọi tư thế có 2 frame gõ. Vầng lửa phóng `FIRE_SCALE = 1.2` × scale nhân vật (1.3 thì lửa 2 hàng đè nhau).
  - (Cũ) Đợt 3 (21/10, anh duyệt): `lean_left_type_a` (ghế xoay chéo, người quay trái) **dùng được** — đọc rõ là nghiêng trái. `lean_right_type_b` **đúng**. File sai là **`lean_left_type_b`** (trùng pixel với `lean_right_type_b`) → đang loại trong `src/coding-test.ts`; lean_left tạm 1 frame + nhún vai. Nếu gen lại `lean_left_type_b` thì bám `lean_left_type_a` (cùng góc ghế xoay chéo), chỉ đổi vai/khuỷu.
  - `build-coding-manifest.mjs` giờ cảnh báo khi 2 file gần như trùng nhau.
  - Đợt 2 (21/10): đã thay `swivel_right` (xoay đúng, ngược chiều swivel_left) và `talk_right` (quay phải). `talk_left` quay trái — tên file đúng, không cần đảo.

### 8.4d Đủ 6 builder khu coding — ĐÃ XONG (22/10)

`CHARACTERS = ['nova','orion','lyra','vega','atlas','comet']` trong `src/coding-test.ts` → mỗi chỗ coding 1 builder (hàng trên Nova/Orion/Lyra, hàng dưới Vega/Atlas/Comet). Click ghế: trống → lần lượt từng builder → trống.

| Builder | Nhận diện (nhìn từ sau) | Cách gen | Scale | Ghi chú |
|---|---|---|---:|---|
| **Nova** | tóc cobalt dựng nhọn, headset cyan | sửa ảnh từng pose (mục 1–10 file prompt) | 0.1071 | ảnh 1024×1536; master gốc chéo 3/4 không dùng |
| **Orion** | tóc navy-đen mượt mái xéo, headset đen viền vàng | re-skin 10 frame Nova (mục 11) | 0.3255 | swivel_left/right **không xoay ghế** |
| **Lyra** (nữ) | đuôi ngựa cao xanh royal, kẹp sao, headset xanh nhạt | re-skin, sheet 5×2 (mục 12) | 0.3195 | lean vẽ ghế xoay chéo → `TUNING`; sheet caro vẽ cứng, còn đốm trong khe chân |
| **Vega** | tóc xanh băng xù nhiều lớp, headset trắng, sét sau lưng | re-skin, khung chuẩn (mục 13) | 0.3195 | swivel_right gần như không xoay |
| **Atlas** | tóc teal rối, cổ áo trắng, áo đen-teal | prompt độc lập (mục 14) | 0.3195 | swivel_right gần như không xoay |
| **Comet** | **mũ len tím**, tóc bạc-lavender, varsity kem/tím patch sao chổi | prompt độc lập, đổi phong cách streetwear nghệ sĩ (mục 15) | 0.3152 | swivel_right xoay rất ít |

- **Lyra là nữ** (anh yêu cầu 22/10; Bible ghi Nam). **Comet** đổi phong cách khác hẳn 4 builder hoodie/headset tông xanh.
- **Quy tắc: mọi hành vi/hiệu ứng áp dụng chung cho TẤT CẢ nhân vật** (lửa siêu tốc, ký tự code, bóng thoại + icon, thời lượng/trọng số, crossfade). Mỗi nhân vật chỉ khác bộ ảnh pose. Vầng lửa scale cố định `0.1071 × 1.2` (không theo scale nhân vật).
- **Tinh chỉnh riêng** qua `TUNING` (chỉ tần suất, không đổi hiệu ứng): Lyra ngồi thẳng 70% / nghiêng 15+15, xoay ghế ×0.3 — đo thực tế thẳng ~73%.
- **Quy tắc góc ghế khi gen** (rút ra sau Orion/Lyra): straight/lean/talk = ghế **thẳng từ sau, không xoay**; lean chỉ nghiêng thân trên 5–8°; talk chỉ quay đầu + vai; **chỉ swivel xoay ghế 20–25°**.
- **Mẹo gen:** GPT hay tự gộp thành 1 sheet → yêu cầu luôn sheet 5×2 có nhãn rồi cắt bằng script. Không có alpha thì đòi nền **magenta #FF00FF** (script xoá sạch), tránh caro vẽ cứng.

### 8.4e Kiểm tra mỗi khi nhận sheet mới
1. Đổi webp → png (WIC), xem alpha thật hay caro vẽ cứng / magenta.
2. `slice-pose-sheet.mjs` → xem contact sheet: đúng thứ tự tên, không dính nhãn, không sót caro.
3. Soi từng pose: lean/talk không xoay ghế; **cả 2 swivel phải xoay ngược chiều nhau**; cặp a/b chỉ khác tay; không có 2 file trùng (manifest cảnh báo).
4. `build-coding-manifest.mjs <ten>` → thêm vào `CHARACTERS` → xem trên `coding-test.html` ở cỡ thật.

### 8.5 Lưu ý khi gen

- AI hay làm **chân duỗi thẳng** → đọc thành đang đứng. Phải yêu cầu rõ: đùi hơi mở, đầu gối gập, bàn chân cách nhau bằng vai.
- Giữ **cùng canvas, cùng anchor, cùng tỷ lệ** cho mọi frame; frame nào lệch thì bỏ, không chỉnh cả bộ.
- Kiểm tra alpha thật: góc ảnh phải alpha = 0, không có caro/trắng bake.

---

## 9. Bài học / lỗi đã gặp

| Lỗi | Nguyên nhân | Cách tránh |
|---|---|---|
| Ghế đè lên nhân vật | Mask tựa lưng vẽ trước nhân vật | Không mask; bake ghế vào sprite |
| Mất tựa lưng | Nhân vật che hết ghế vì hẹp hơn | Bake ghế; hoặc ghế rộng hơn người |
| Nhân vật lơ lửng | Neo theo mặt ghế thay vì điểm chạm sàn | Neo đáy tại **đế ghế trên sàn** |
| Chân người/ghế rối | Pose chân thẳng, hai chân sát nhau | Yêu cầu pose ngồi rõ: gối gập, chân cách nhau |
| Hai ghế chồng | Ghế nền chưa xoá | Background sạch ghế (đã xong) |
| Neon sai chính tả | AI viết chữ kém | Đã kiểm tra 6 biển, đều đúng |
| ChatGPT lưu nhầm/trùng file (2 pose giống hệt), pose talk lẫn vào frame gõ | Gen nhiều ảnh liên tiếp | Luôn xem contact sheet; manifest cảnh báo file trùng |
| Nền caro vẽ cứng thay vì alpha | GPT giả lập "transparent" | Đòi nền magenta #FF00FF nếu không có alpha; script tự tách |
| Lean xoay ghế quá đà / swivel không xoay | Prompt chưa tách rõ góc ghế | Quy tắc góc ghế ở 8.4d; nhắc riêng "BOTH swivel must rotate" |
| Em (Claude) đọc nhầm thứ tự ô contact sheet → báo sai tên talk | Đếm ô sai | Ghép contact sheet có nhãn / kiểm tra từng file riêng trước khi kết luận |

---

## 10. Mốc tham chiếu cũ

- `VIBE_CODE_STUDIO_STATUS_2026-10-20.md`: trạng thái engine v1.3 (legacy).
- `VIBE_CODE_STUDIO_SPRITE_ENVIRONMENT_BIBLE.md`: quy chuẩn art (màu, ánh sáng, cấu trúc asset). Lưu ý: Bible khuyến nghị furniture tách rời; dự án này **đã chuyển sang bake ghế** vì ràng buộc của background.
