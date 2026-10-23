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

  **ĐẦU VÀO THẬT (đọc README opencode-project-template "How it works" + tools/task-dashboard, 23/10):** loop của template ghi file **CHỈ-HIỂN-THỊ** `<repo>/.context/agents-live.json` bằng `node tools/task-dashboard/agent-live.mjs enter|leave|clear` (atomic tmp+rename, lock):
  ```
  { "updatedAt":"ISO", "agents":[ {agent:"builder-1", role:"builder", phase:"building", task:"layer-1/task-02", title:"REST API /users", worktree?, since:"ISO"},
                                  {agent:"reviewer-1", role:"reviewer", phase:"review", ...}, {agent:"merger", role:"merger", phase:"merging"} ] }
  ```
  role hiện chỉ `builder|reviewer|merger|dispatcher`, phase `building|review|merging|orchestrating|idle`; **tên agent là id chung (builder-1, reviewer-2…), KHÔNG phải tên nhân vật**. enter = upsert (vào scene), leave = xoá (rời scene). `progress.json` mới là source of truth (completedTasks/blockedTasks/currentLayer) — chưa dùng. Dashboard cũ của họ (`server.mjs --repo` cổng 7788) gộp thành `/api/state` (agents/benchAgents/columns/counts…) — **mình không dùng**, đọc thẳng file.
  Pipeline: `/start` → 1a spec-init → 1b spec-validator ⏸ → 2 brainstorm ⏸ → 3 design ⏸ → 4 graph ⏸ → loop mỗi layer (dispatcher plan → builder ×N song song mỗi worktree → 5c error-analyzer khi fail → 5d reviewer → 5e merge (dispatcher, Eve chỉ là hình minh hoạ) → 5g spec-validator ⏸ checkpoint) → sau build mọi thay đổi qua `/change` (change-request → spec-publisher → builder/reviewer → spec-validator).

  **ĐÃ LÀM (23/10):**
  - `studio.config.json` → `stateFile` (mặc định `.context/agents-live.json`, tương đối dự án hoặc tuyệt đối) + `pollMs` (1000). Biến môi trường `STATE_FILE` đè. **Anh tự config đường dẫn khi ghép.**
  - `vite.config.ts` plugin `live-state`: `GET /state.json` trả nội dung file (dev + preview, no-store); thiếu file → `{missing:true,file}`.
  - `src/live-state.ts` `LiveMapper`: agent → nhân vật. **builder/reviewer: CHỌN NGẪU NHIÊN trong các nhân vật đang rảnh của nhóm (anh chốt lại 23/10 — bỏ gán cố định theo số)**: builder/builder-strong → một trong Nova, Orion, Lyra, Vega, Atlas, Comet; reviewer → một trong Sage, Iris, Juno, Echo; giữ nguyên nhân vật suốt lúc agent còn trong file; quay lại trong 2 phút thì lấy lại nhân vật cũ nếu còn rảnh; nhiều agent hơn nhân vật → dùng chung 1 sprite đang bận (không thêm sprite). Tối đa 6 builder.
  - Trang test: nút **"LIVE (đọc file JSON)"** trên thanh IDLE (hoặc mở `coding-test.html?live`): poll `/state.json`, nhân vật có agent → về ghế làm việc, không có → đi nghỉ (thử lại mỗi 5 s nếu hết chỗ nghỉ); bật LIVE thì tắt tự động làm↔nghỉ. Ô log có dòng LIVE liệt kê nhân vật ← agent (task).
  - **Kịch bản giả lập ĐỦ LUỒNG** `node scripts/dummy-scenario.mjs [--speed 2] [--once] [--file <path>]` (theo README "How it works" + `.agent/loop.md` — đúng cách loop gọi agent-live: builder-n enter → PASS thì leave builder-n + enter reviewer-n → leave; merge = `merger` enter/leave do dispatcher; cuối layer `clear`): /start → spec-init → spec-validator **FAIL → clarify → re-validate PASS** → brainstorm → design → graph → **L0** devops git init/CI + 2 builder → **L1** wave 1 (3 builder) + wave 2 (task phụ thuộc), error-analyzer retry 3 lần → task **BLOCKED**, review **FAIL → round 2**, merge **CONFLICT → error-analyzer trên integration**, devops CI → **L2** 6 builder (1 builder-strong), reviewer-5/6 → **L3** + devops deploy staging **FAIL → rollback → error-analyzer → prod** → bảo trì **/bug-check → /bug (BUG, root cause trước) → /feature (ADDITIVE: spec-publisher, validator, 2 builder, 2 reviewer, phase close)** → 1 agent `phase:"idle"` (vẫn tính nghỉ) → clear, lặp. ~455 s/vòng ở speed 1. Log terminal in từng bước + danh sách agent đang làm. Roles ngoài 4 role của agent-live.mjs là **mở rộng** (spec-init, design, graph, error-analyzer, devops, rollback, bug-check, change-request, spec-publisher, builder-strong).
  - **Đã chạy thử 23/10** (speed 2 + `coding-test.html?live`, hơn 1 vòng, so mỗi 2 s file ↔ nhân vật): đúng nhân vật theo từng bước, **0 lần trùng/vừa làm vừa nghỉ**, trễ ~2–4 s (poll 1 s + fade). `LiveMapper` nhớ nhân vật cũ 2 phút sau khi agent rời → builder-2 quay lại round 2 vẫn là Orion. bug-check → Sherlock, devops/rollback/change-request → Theo, builder-strong → pool builder, reviewer-5/6 → dồn vào Echo.
  - `.context/` đã vào `.gitignore` (file runtime).
  - **Bảng thông tin nhân vật (23/10):** click vào nhân vật (đang làm hay đang nghỉ) → thẻ pixel-style cạnh nhân vật (`src/info-panel.ts`, DOM đè canvas) + vòng sáng màu dưới chân: ảnh đại diện (`<ten>/idle/stand_drink.png` phóng nửa trên), **tên, role, khu**, trạng thái **ĐANG LÀM VIỆC / ĐANG NGHỈ**, việc đang làm (dịch hành động: gõ code, săn bug, Merge Rush… / pha cà phê, lướt điện thoại, ngủ gật…), nơi + thời gian ở trạng thái đó; khi LIVE thêm danh sách **agent từ file JSON** (id, role, task, title, từ bao lâu); khi không LIVE có nút "Cho nghỉ / Về làm việc". Cập nhật 0.4 s, đóng bằng ✕/Esc/click lại. Hồ sơ + màu từng nhân vật: `PROFILES` trong `info-panel.ts`. Click không còn đổi làm↔nghỉ (dùng nút trên thẻ hoặc thanh IDLE); ghế trống vẫn click để thêm builder.
  **Trạng thái → hành vi (anh chốt 23/10): CHỈ 2 TRẠNG THÁI — LÀM VIỆC hoặc IDLE.** Nhân vật làm việc khi có ít nhất 1 agent map vào nó nằm trong `agents[]` với phase ≠ `idle` và không `stale`; mọi trường hợp khác (benchAgents, phase idle, stale, biến mất khỏi JSON) = **idle**. Gộp nhiều agent (vd Captain + Muse) → Theo hiện 1 lần, HUD liệt kê đủ agent + task. Phase chỉ dùng chọn khu khi role lạ (`building`→coding, `review`→review, `merging`→Eve, `orchestrating`→Theo). Lỗi đọc → giữ snapshot cuối.
  **Nguồn dữ liệu (anh chốt 23/10):** chạy local → **đọc thẳng file JSON do hệ thống khác ghi ra** (trước đây backend `server.mjs` cổng 7788 đọc `.context/agents-live.json` rồi trả `/api/state`). Dự kiến: Vite dev server thêm middleware `/state.json` trả nội dung file (đường dẫn qua biến `STATE_FILE`, mặc định `.context/agents-live.json`, header no-cache); trang poll mỗi 1–3 s; JSON hỏng/đang ghi dở → bỏ qua lần đó, giữ snapshot cuối. Bible ghi poll 3 s.
  **Hành động trong lúc làm việc** vẫn chạy random như trang test (gõ, đọc, hiệu ứng đỉnh); có thể nối thêm sau: task mới → approve/stamp khi task chuyển sang `columns.done`.
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
- **IDLE ĐÃ CHẠY với Pixel (22/10):** sheet `public/assets/pixel/idle_sheet.png` (gen lại lần 2 — nhãn tách rời, có khe giữa 2 hàng; bản 1 dính pose) → xoá 2 dải nhãn (y 452–494, 945–987) rồi `slice-pose-sheet` → `public/assets/pixel/idle/` 12 pose. Manifest `node scripts/build-coding-manifest.mjs pixel 106 0.023 idle sit_relax.png` → scale 0.2697 (đầu ≈ 62 px như lúc làm việc).
  - **Module `src/idle.ts`:** `IdleWorld` (giữ chỗ: 1 người/slot, slot gần nhau < 40 px hoặc có trong `conflicts` thì chặn nhau, chỗ làm việc là `blockers` có id) + `IdleAgent` (fade 300 ms đổi chỗ mỗi 25–50 s, chọn hoạt động theo loại slot, rủ người ngồi gần ≤130 px nói chuyện 40%, khói cốc khi uống, chữ z khi ngủ gật, hơi máy pha khi brew, sao khi chơi điện thoại, bóng thoại icon pixel khi nói/cười).
  - **Slot chốt** (`IDLE_SLOTS`): C1 (188,425) ghế quay lưng · C2 (231,430) ghế quay ra, lật · C3 (348,352) quay lưng · C4 (410,338) quay ra, lật — **C3/C4 chặn nhau** · C5 (240,302) quầy (brew/drink) · R1 (1150,815) sofa, **chặn khi Pixel làm việc (P)** · R2 (1265,800) · R3 (1345,825) lật · R5 (1078,875) pouf · R6 (1150,905) pouf · R7 (1330,940) ghế đôi, sit_back · R8 (1432,908) cây nước, stand_drink lật. **Bỏ C6** (đứng chen bàn A). Tối đa 11 người idle cùng lúc.
  - Trang test có thanh **IDLE**: Pixel làm việc / Pixel idle / Đổi chỗ / + Clone idle / Xoá clone (clone = Pixel để thử không ngồi đè). Kiểm tra: 30 lượt đầy chỗ + 3 phút đổi chỗ liên tục → 0 trùng/đè. QA `environment/idle-pixel-cafe.png`, `idle-pixel-relax.png`. `build-deploy.mjs` đã copy thêm khu `idle`.
  - Lỗi đã sửa: `choose()` gọi `pick()` trong callback `find` → đôi khi không khớp → văng lỗi, agent giữ chỗ nhưng ẩn.
  - **SỬA 22/10 (anh: lệch ghế/sofa, sai pose theo khu, không random):**
    - **Toạ độ chốt lại** (soi phóng 4× từng chỗ; pose sofa vẽ co gối nên phải đặt LÙI SÂU vào đệm, không đặt chân ở mép): R1 (1162,795) · R2 (1268,782) · R3 (1335,803) lật · R5 pouf (1080,858) · R6 pouf (1152,888) · R7 ghế đôi (1336,928) · R8 cây nước (1420,918) lật. Cafe giữ: C1 (188,425) · C2 (231,430) lật · C3 (348,352) · C4 (410,338) lật · C5 (240,302).
    - **Pose cố định theo từng chỗ** (`IDLE_SLOTS[].acts`, không còn bảng theo loại): C5 = brew rồi drink (theo thứ tự) · C1/C3 = chair_back_drink · C2/C4 = chair_front_drink · R1/R2 = relax/phone/drink · R3 = phone/relax · R5 = relax/phone · R6 = doze/relax · R7 = sit_back · R8 = stand_drink. Pose nói (`talk`: chair_*_talk / sit_laugh) chỉ khi có bạn cùng `group` (tableA C1+C2, tableB C3/C4, sofa R1–R3, poufs R5–R6), 35%.
    - ~~**Lịch trình cố định thay random** (`ROUTINE`): quầy C5 (7–11 s) → bàn cafe (25–40 s) → lounge (40–70 s) → quay lại quầy; trong mỗi khu lấy chỗ trống đầu tiên theo thứ tự cố định~~ → **đã thay bằng kịch bản ngẫu nhiên (mục dưới)**.
    - **KỊCH BẢN IDLE NGẪU NHIÊN (anh chốt 22/10, thay lịch trình cố định):** mỗi lượt chọn **random 1 trong 2 khu** (`cafe` = quầy C5 + C1–C4, `lounge` = R1–R8; khu đầy thì sang khu kia), rồi **random 1 chỗ trống** trong khu (không lặp lại chỗ đang ngồi). Ở lại `STAY` 18–35 s (quầy `COUNTER_STAY` 9–14 s), fade 300 ms rồi đổi tiếp.
      - **Hoạt động nghỉ theo chỗ** (`acts` = pose + hiệu ứng `fx`): C5 pha cà phê (hơi + giọt cà phê) → "ding!" + cốc bay lên → đứng uống (khói) · C1–C4 uống (khói) hoặc thở "ahh~" · sofa R1–R3: nghe nhạc (nốt nhạc pixel `music` bay, thở nhẹ), chơi game điện thoại (sao, thỉnh thoảng "WIN!"), lướt điện thoại (tim bay), uống · pouf R5/R6: ngủ gật (Zzz + thở chậm), nhạc, game · R7 ghế đôi ngắm thành phố (lấp lánh ngoài kính, "~") · R8 cây nước (bọt nước xanh + giọt).
      - **Tương tác khi 2 người cùng nhóm** (40% mỗi lần đổi hành động; người khởi xướng giữ pose cả 2 tới hết): bàn cafe = `chat` (bóng thoại) / `cheers` (cụng ly: lấp lánh giữa 2 người + "Cheers!" + 2 cốc, rồi tim); sofa = `chat` / `laugh` (cả 2 cười nảy người + mặt cười bay) / `selfie` (1.3 s nháy flash trắng + "click!" + tim/sao); pouf = `chat` / `laugh` / `poke` (chỉ khi bạn đang ngủ gật: "psst~" → bạn giật mình "!" + giọt mồ hôi, tỉnh dậy ngồi thư giãn). Người mới tới chỗ có bạn → bạn vẫy chào (tim/chat/lấp lánh).
      - **XẾP LẠI GHẾ CAFE (anh: "ngồi như này hơi dở", 22/10):** C2 cũ dùng pose quay mặt ra đặt ở ghế trước bàn A → ngồi quay lưng vào bàn, chồng lên C1. Chốt mới: **bàn A = 2 người ngồi cạnh nhau ở 2 ghế phía trước, cùng quay lưng ra người xem, nhìn vào bàn** — C1 (188,425) `chair_back_*` · C2 **(250,436) `chair_back_*` lật** (nhìn lên-trái). **Bàn B = đối diện nhau qua bàn** — C3 **(345,356)** quay lưng · C4 **(418,334)** quay mặt ra, lật (ghế xa bên phải). **Bỏ chặn C3/C4** → 5 chỗ cafe ngồi cùng lúc được. Kiểm tra 6 người × 10 phút: 0 đè, 0 lỗi. Pose quay mặt ra (`chair_front_*`) giờ chỉ dùng ở C4.
      - Icon mới `music` trong `src/pixel-icons.ts`.
      - **Trang test chỉ còn 1 Pixel (anh duyệt 22/10):** bỏ nút clone/tương tác. **Bấm vào Pixel** (ở bàn sofa làm việc, hoặc ở chỗ đang idle) → `togglePixel()` chuyển **làm việc ↔ nghỉ** (`pixelSeat.root` thay listener chọn người bằng toggle; `pixelIdle.root` bấm được). Thanh IDLE còn 2 nút: "Pixel làm việc ↔ nghỉ", "Đổi chỗ ngẫu nhiên". Tương tác 2 người vẫn có trong `idle.ts` — sẽ hiện khi có ≥ 2 nhân vật idle thật. Đã bấm thử trên trình duyệt cả 2 chiều.
      - Kiểm tra: 4 người × 15 phút mô phỏng → 133 lần đổi chỗ (cafe 60 / lounge 73, đủ 12 chỗ), 0 trùng/đè, 0 lỗi; 11 người × 5 phút đầy chỗ → 0 trùng. Soi trên trình duyệt: selfie flash, poke "!", Cheers hiện đúng.
    - Kiểm tra: lịch trình Pixel 4 phút đúng thứ tự; 11 người × 3 phút → 0 trùng/đè, 0 pose sai khu.
  - **LUẬT 1 NHÂN VẬT = 1 SPRITE (anh chốt 22/10):** khi chạy thật mỗi nhân vật chỉ hiện đúng 1 chỗ — hoặc đang làm việc ở ghế, hoặc đang idle — không bao giờ cả hai, không bao giờ 2 bản. Code: `IdleWorld.isWorking(name)` nối với mọi ghế làm việc → idle agent không được `start` khi đang làm việc; ghế nào nhận nhân vật thì gọi `onSeated(name)` → `idleWorld.leave(name)` (idle biến mất ngay); tạo 2 `IdleAgent` thật cùng tên → báo lỗi. Bấm ghế đổi người trên trang test bỏ qua nhân vật đang có mặt ở chỗ khác (`onStage`). **Chỉ clone test** (`new IdleAgent(world,cast,true)`, nút "+ Clone idle (test)") được trùng — dùng để thử vị trí, không dùng khi chạy thật. Đã kiểm tra: idle bị từ chối khi đang làm việc, làm việc thì idle rời đi, 20 lần bấm ghế coding/review → 0 trùng.
  - **IDLE TỪNG NHÂN VẬT (anh chốt 22/10): làm lần lượt từng bộ, NOVA trước.** Prompt mục **24a** (mẫu tư thế = sheet idle Pixel, mặt Nova lấy từ `swivel_left.png`; đồ riêng: lon nước tăng lực, cốc "{ }", máy chơi game cầm tay). 
    - **Nova ĐÃ CẮT + CHẠY (22/10):** sheet `public/assets/nova/idle_sheet.png` (1536×1024, alpha thật) → `public/assets/nova/idle/` 12 pose. 4 ảnh dính nhãn (`sit_doze`, `sit_laugh`, `sit_phone`, `stand_drink`) → bỏ bằng "khối nhãn độ rộng không đổi" (bắt đầu dò từ hàng đáy −6 để tránh góc bo, đi lên khi span ±6 px so với hàng −10, cắt cách 2 hàng). ⚠ Cách "tìm khe hàng ≤ 3 px" cắt hỏng ở sheet này (khe có pixel mờ).
    - Ghế cafe trong sheet Nova cao ≈ ghế trong sheet Pixel (~218 px nguồn) → **dùng chung cỡ với Pixel**: `node scripts/build-coding-manifest.mjs nova 105 0.023 idle sit_relax.png` → scale 0.2672. Sửa tay `stand_drink.anchorX` 59 → **121** (đáy chỉ có 1 chiếc giày nên tâm lệch). Ghép thử 12 chỗ: ghế trong sprite đè khít ghế nền, không cần chỉnh slot.
    - Code: `IDLERS=['pixel','nova']` trong `coding-test.ts` → mỗi nhân vật 1 `IdleAgent`. **Bấm nhân vật đang làm việc** (ghế coding qua `goIdle`, Pixel qua `togglePixel`) → rời ghế đi nghỉ; **bấm lúc đang nghỉ** → `backToWork` về đúng ghế vừa rời (ghế đã có người khác thì ở lại nghỉ). Thanh IDLE: Pixel ↔, Nova ↔, Đổi chỗ ngẫu nhiên. Kiểm tra: bấm 2 chiều đúng; Pixel + Nova nghỉ cùng 10 phút → 0 đè, 0 lỗi, có chat/cheers giữa 2 người.
    - **Orion (tiếp theo, 22/10):** prompt mục **24b** — từ đây dùng **sheet idle Nova làm khung tư thế** (cùng dáng nam); mặt Orion lấy từ `orion/coding/talk_left.png`. Đang chờ sheet → `public/assets/orion/idle_sheet.png`.
    - **Từ Orion: chỉ đính kèm 3 ảnh** (sheet mẫu đã có ghế/góc/cỡ/ánh sáng → bỏ ảnh ghế + 2 ảnh khu) và **động tác nghỉ theo tính cách từng người** (giữ cố định tên pose, hướng mặt, ghế, cỡ; đổi cử chỉ, nét mặt, đồ cầm). Mẫu: nam = sheet Nova, nữ = sheet Pixel. Bảng tính cách + ảnh tham chiếu cho 13 người còn lại: prompt mục **24c**.
    - **Orion ĐÃ CẮT + CHẠY (22/10):** sheet `public/assets/orion/idle_sheet.png` **không có alpha (caro vẽ cứng)** → slicer tự xoá caro; 4 ảnh dính nhãn (`sit_doze/drink/phone/relax`) → cắt khối nhãn như Nova, rồi **còn sót viền trên của nhãn** (vệt cam 1–3 hàng, ở `sit_drink` dính liền đế giày) → xoá tay N hàng đáy (drink 17, phone 12, relax 9) sau khi soi phóng 3×; `clean-fringe.mjs 2` cho cả 12. Manifest `node scripts/build-coding-manifest.mjs orion 106 0.023 idle sit_relax.png` → scale 0.269; sửa tay `stand_drink.anchorX` 90 → 115. `IDLERS=['pixel','nova','orion']`; thanh IDLE tự sinh 1 nút "<Tên> ↔" cho mỗi builder có idle. Soi 12 chỗ ổn; 3 người nghỉ cùng 10 phút → 0 đè, 0 lỗi.
    - **Lyra (tiếp theo, 22/10):** prompt mục **24d** (mẫu = sheet idle Pixel vì Lyra nữ; đồ riêng: trà sữa đá, sổ tay sao + bút, cốc sứ xanh sao, game xếp hình). Đang chờ sheet → `public/assets/lyra/idle_sheet.png`.
    - **Lyra ĐÃ CẮT + CHẠY (22/10):** sheet anh gửi **nhỏ (843×562, mỗi ô ~140×281), không nhãn, nền trắng-hồng BÁN TRONG SUỐT (alpha 30–130) + đường lưới magenta** → trước khi cắt đổi alpha: < 170 → 0, ≥ 230 → 255, giữa nội suy; lưu `public/assets/lyra/idle_sheet.png` rồi `slice-pose-sheet` bình thường (12/12 sạch, không cần bỏ nhãn). Ảnh nguồn nhỏ nên scale lớn: `build-coding-manifest.mjs lyra 105 0.023 idle sit_relax.png` → **0.4709** (ghế trong sprite vẫn = ghế Pixel ~112 px). `IDLERS` thêm `lyra`. Soi 14 ảnh ghép ổn; 4 người nghỉ 10 phút → 0 đè/0 lỗi. (Lần soi đầu trình duyệt bị treo — đóng tab mở lại là chạy, không phải lỗi code.)
    - **Vega ĐÃ CẮT + CHẠY (22/10):** sheet alpha thật 1536×1024 → `public/assets/vega/idle/`. Chỉ `sit_doze` dính nhãn (bỏ như Nova); GPT **tự vẽ chữ "Zzz"** trong `sit_doze` → xoá blob riêng ở góc trên-phải (game đã tự thêm Zzz). Vega ít tóc hơn nên **chuẩn theo ghế**: ghế `chair_back_drink` hiển thị ≈ 112 px như Pixel → `build-coding-manifest.mjs vega 101 0.023 idle sit_relax.png` → scale 0.279; `stand_drink.anchorX` 98 → 115. `IDLERS` thêm `vega`. 5 người nghỉ 8 phút → 0 đè/0 lỗi, đủ 5 kiểu tương tác (kể cả poke).
    - **Atlas ĐÃ CẮT + CHẠY (22/10):** sheet **nền ĐEN đặc (RGB, không alpha)** — viền nhân vật cũng gần đen nên slicer không xoá được → script nháp `unblack.mjs`: vùng pixel max kênh ≤ 8 chạm mép ảnh, hoặc túi kín ≥ 40 px (khe chân/chân ghế) → trong suốt; pixel tối ≤ 20 sát nền → alpha mềm. Sau đó slice; 8/12 ảnh dính nhãn → cắt khối nhãn + xoá tay hàng viền nhãn sót (`sit_relax` ≥ 413, `chair_front_drink` ≥ 430, `stand_drink` ≥ 437). Khói vẽ sẵn ở `sit_drink` dính liền bình → giữ. Manifest `build-coding-manifest.mjs atlas 109 0.023 idle sit_relax.png` → 0.2691 (ghế ≈ 112 px). `IDLERS` thêm `atlas`. 6 người nghỉ 8 phút → 0 đè/0 lỗi.
    - **Comet ĐÃ CẮT + CHẠY (22/10) → ĐỦ 6 BUILDER CÓ IDLE:** sheet **caro XÁM vẽ cứng** (tông 135–210, không alpha; slicer chỉ xoá caro sáng ≥190) → script nháp `ungrey.mjs`: vùng xám không màu (min ≥ 128, max ≤ 214, chênh kênh ≤ 12) chạm mép, hoặc túi kín ≥ 80 px có cả 2 tông caro → trong suốt; rồi slice + `clean-fringe.mjs 2`. 6 ảnh dính nhãn → cắt khối nhãn + xoá tay hàng viền sót (stand_brew/sit_phone/sit_doze 10 hàng đáy, stand_drink 14 + hàng 437). Cỡ theo ghế: `build-coding-manifest.mjs comet 98 0.023 idle sit_relax.png` → 0.2792 (lần đầu 104 → ghế 120 px, to quá); `stand_drink.anchorX` → 125, `stand_brew.anchorX` → 138. `IDLERS` thêm `comet`. 7 người nghỉ 8 phút → 0 đè/0 lỗi.
    - **Sage ĐÃ CẮT + CHẠY (22/10) — reviewer đầu tiên có idle:** sheet alpha thật, GPT làm đúng hết (không ghế tím, không khói); 6 ảnh dính nhãn → cắt khối nhãn. Manifest `build-coding-manifest.mjs sage 100 0.023 idle sit_relax.png` → 0.2667. **`ReviewSeat` tap gọi `goIdle` trước** → bấm Sage ở bàn review là đi nghỉ, bấm lúc nghỉ về đúng ghế review. Nút IDLE sinh cho mọi `IDLERS` trừ pixel (tìm cả `seats` + `reviewSeats`).
      - **SỬA NEO GHẾ CAFE cho mọi nhân vật:** anchor mặc định (tâm hàng pixel thấp nhất) ở `chair_*` lúc rơi vào chân ghế, lúc rơi vào giày → ghế nhảy 10–25 px khi đổi uống ↔ nói (kể cả Pixel: front_drink 176 vs front_talk 121). Script nháp `chair-anchor.mjs`: tìm hàng gỗ thấp nhất (pixel nâu-cam) rồi đặt anchor = giữa chân ghế + độ lệch của Pixel `chair_*_drink` quy ra px màn hình (front 11.5/2 px, back 0.3/1.3 px) ÷ scale từng người. Đã chạy cho 8 nhân vật; soi C4 uống/nói: ghế trùng chỗ. **Nhân vật mới: chạy `chair-anchor.mjs <ten>` sau `build-coding-manifest`** (script ở scratchpad — chép logic nếu cần: hàng thấp nhất có ≥ 3 pixel r>90, r−b>50, g>40, r>1.25g).
      - 8 người nghỉ 8 phút → 0 đè/0 lỗi.
    - **Iris ĐÃ CẮT + CHẠY (22/10):** anh tự gen (không qua prompt riêng; ngoại hình theo bảng 24c: tóc hồng cam đuôi ngựa xù + nơ trắng, áo khoác hồng, váy navy, trà sữa trân châu, selfie chữ V, ôm gối tim ngủ). Sheet **caro xám vẽ cứng** → `ungrey.mjs <src> <out> 20 168 0` (túi kín ≥ 20 px có tông tối < 168 → xoá; mặc định 80/165/180 để sót mảng xám giữa lọn tóc xoăn). 2 ảnh dính nhãn. Cỡ theo ghế: `build-coding-manifest.mjs iris 93 0.023 idle sit_relax.png` → 0.2627, rồi `chair-anchor.mjs iris`. `stand_drink` co một chân → anchor tự động rơi đúng chân trụ. `IDLERS` thêm `iris`. 9 người nghỉ 8 phút → 0 đè/0 lỗi.
      - ⚠ **Giới hạn chỗ:** chỉ có 12 slot (C3/C4 không chặn nhau nữa; R1 bị chặn khi Pixel làm việc) → tối đa ~11–12 người nghỉ cùng lúc. Khi đủ 15 nhân vật, nếu hết chỗ thì `goIdle` đã bỏ trống ghế làm việc nhưng `start()` trả false → **nhân vật biến mất**. Cần xử lý trước khi nối `/api/state` (thêm slot, hoặc không rời ghế khi hết chỗ).
      - **ĐÃ SỬA (anh chốt 22/10): hết chỗ thì ở lại ghế làm việc.** `IdleWorld.hasRoom(agent)` (còn slot nào `free`); `goIdle` kiểm tra TRƯỚC khi bỏ trống ghế — hết chỗ → nhân vật giữ nguyên ghế + chữ vàng "hết chỗ nghỉ" bay lên trên đầu 1.4 s (`showFull`); nếu `start()` vẫn thất bại thì ngồi lại ghế. Đã thử: 11 clone lấp đầy → bấm Nova (coding) và Sage (review) đều ở lại ghế; bỏ 1 clone → Nova đi nghỉ được. Khi nối `/api/state` dùng cùng luật: agent rảnh mà hết slot thì vẫn hiện ở ghế làm việc.
    - **Juno ĐÃ CẮT + CHẠY (22/10):** anh tự gen (beret kem, 2 bím lavender nơ xanh, kính tròn vàng, váy yếm xanh; đan len, matcha đá, ngủ tựa má lên tay, đánh matcha ở quầy). Sheet alpha thật, 6 ảnh dính nhãn. `build-coding-manifest.mjs juno 101 0.023 idle sit_relax.png` → 0.2658, rồi `chair-anchor.mjs juno`. `IDLERS` thêm `juno`. 10 người nghỉ 6 phút → 0 đè/0 lỗi.
      - **Sửa `chair-anchor.mjs`:** giày nâu (mary-jane của Juno, giày Comet) bị nhận nhầm là gỗ ghế → với ghế `chair_front_*` chỉ dò **nửa trái ảnh** (chân ghế trước-trái). Chạy lại cho 10 nhân vật: chỉ Comet front_drink (169 → 152) và Juno front_drink (227 → 144) đổi.
    - **Echo ĐÃ CẮT + CHẠY (22/10) → ĐỦ 4 REVIEWER CÓ IDLE:** anh tự gen (bob đen ombre mint, headphone trắng-mint, hoodie đen sóng âm, váy trắng, móc khoá bọ mint, bình giữ nhiệt; ngủ trùm mũ hoodie). Sheet caro xám → `ungrey.mjs … 20 168 0`; 6 ảnh dính nhãn + xoá tay hàng nhãn sót ở `sit_drink`/`sit_doze` (≥ 396). Cỡ theo ghế (ghế hiển thị ≈ 114 px như mọi người): `build-coding-manifest.mjs echo 97 0.023 idle sit_relax.png` → 0.2608, rồi `chair-anchor.mjs echo`. `IDLERS` thêm `echo` (11 người). 11 người nghỉ cùng lúc 6 phút → 0 đè/0 lỗi/0 người biến mất.
    - **Eve ĐÃ CẮT + CHẠY (22/10):** anh tự gen (tóc bob tím than ánh xanh, kẹp tam giác phát sáng, áo khoác hologram, short bạc, bốt; cà phê đá, tablet, kính râm cài đầu khi ngủ). Sheet alpha thật nhưng **1500×1000 và các hình dính sát nhau** (tóc/bốt chạm hình bên cạnh) → slicer lưới chia sai (sit_laugh 17×17). Cắt bằng script nháp `cellslice.mjs`: tự chọn đường cắt ở cột ít pixel nhất quanh mỗi biên ô (hàng 1: 255/499/755/998/1252, hàng 2: 264/530/775/1013/1250), cắt ô có lề 45 px rồi chỉ giữ mảng liền khối nằm > 50% trong ô; mảnh hình bên cạnh còn dính liền (sit_doze trái, sit_laugh phải) → cắt tay theo cột. 10 ảnh dính nhãn. Manifest `build-coding-manifest.mjs eve 100 0.023 idle sit_relax.png` → 0.2695 + `chair-anchor.mjs eve`. `IDLERS` thêm `eve` (12). Nút IDLE tìm ghế trong `[...seats,...reviewZone]` → bấm Eve ở bàn MERGE đi nghỉ/về được. 12 người nghỉ → 0 đè/0 lỗi/0 biến mất.
      - ⚠ Lỗi do em gây khi thêm Echo/Eve bằng `sed`: mẫu `'juno','echo'];` khớp cả `REVIEWERS` → Eve lọt vào danh sách reviewer, trang không tải được (`eve/review/manifest.json` không có). Đã sửa lại `REVIEWERS=['sage','iris','juno','echo']`. **Khi thêm vào `IDLERS` phải sửa đúng dòng `const IDLERS=`.**
    - **Theo ĐÃ CẮT + CHẠY (22/10):** anh tự gen (tóc nâu xù, bút chì cài tai, kính tròn, gile len, túi đeo chéo dán sticky; clipboard, cốc cam, pha drip, ngủ úp clipboard lên mặt). Sheet alpha thật; 7 ảnh dính nhãn + còn **1 hàng viền nhãn mờ (alpha < 170) dính đế giày** → xoá pixel alpha < 170 ở 6 hàng đáy; `stand_brew` còn thanh nhãn cam → cắt theo độ rộng hàng. Manifest `build-coding-manifest.mjs theo 100 0.023 idle sit_relax.png` → 0.2639 + `chair-anchor.mjs theo`; `stand_drink.anchorX` 105 → 125. `IDLERS` thêm `theo` (13 > 12 chỗ). Thử kín chỗ: Eve bấm lúc đầy → ở lại MERGE ("hết chỗ nghỉ"); 12 người nghỉ 5 phút → 0 đè/0 lỗi.
    - **Oracle ĐÃ CẮT + CHẠY (22/10):** anh tự gen (đuôi ngựa cao navy ombre xanh + ruy băng đỏ, kính đỏ, blazer đen viền đỏ, thẻ QA; cốc đen tick đỏ, french press, khoanh tay hờn dỗi, ngủ vẫn cầm bút đỏ). Sheet alpha thật nhưng **tóc dài dính hình bên cạnh** → `cellslice.mjs` (cắt hàng 1: 271/527/771/1027/1287, hàng 2: 281/547/803/1054/1294); `stand_brew` và `stand_drink` dính tóc nhau → cắt theo cột trũng (brew giữ x < 247, drink x ≥ 51). 6 ảnh dính nhãn. Manifest `build-coding-manifest.mjs oracle 105 0.023 idle sit_relax.png` → 0.2567 + `chair-anchor.mjs oracle`. `IDLERS` thêm `oracle` (14). 13 người bấm đi nghỉ + Pixel → 12 nghỉ, 2 ở lại ghế, 0 đè/0 lỗi/0 biến mất.
    - **Sherlock ĐÃ CẮT + CHẠY (22/10) → ĐỦ 15/15 NHÂN VẬT CÓ IDLE:** anh tự gen (mũ deerstalker, tóc đỏ cam, trench đen lót đỏ; kính lúp, cốc giấy, ấm drip, ngủ mũ che mặt). Sheet alpha thật; 6 ảnh dính nhãn; `stand_brew` dính nhãn "sit_doze" của hàng trên ở đỉnh đầu → xoá 46 hàng đầu. `build-coding-manifest.mjs sherlock 111 0.023 idle sit_relax.png` → 0.2612 + `chair-anchor.mjs sherlock`; `chair_front_talk` chỉnh tay anchor (143, 449) cho ghế trùng `front_drink` (giày nâu đậm làm lệch dò tự động). `IDLERS` đủ 15.
    - **KÍN CHỖ → ĐỔI CHỖ THEO CẶP (anh chốt 22/10):** trước đây khi 12 chỗ kín, ai tới giờ đổi chỗ cũng mờ đi rồi hiện lại đúng chỗ cũ → cả phòng nháy liên tục. Giờ `advance()`: nếu không còn chỗ trống nào khác → chọn ngẫu nhiên 1 người đang ngồi yên, **2 người cùng mờ và tráo chỗ cho nhau** (`swapTo`); `IdleWorld.swapping` chặn chỉ **1 cặp mỗi lúc** (người khác tới giờ thì hoãn 3–6 s). Chỗ cũ được giữ cho người kia tới sau (không để người thứ 3 chen vào). Kiểm tra 12 người × 10 phút: lúc nào cũng ≤ 2 người đang mờ (hiếm khi 3–4 vài khung), 0 lỗi, sổ chỗ luôn khớp.
    - **GÓC RIÊNG Eve/Theo/Oracle (anh chốt 22/10):** khu kệ sách sau dãy CODING = 2 ghế đọc sách **L1 (520,246), L2 (580,264)** (ghế bake vào sprite `read_a/b`), góc kệ cao cạnh cửa MERGE = đứng tìm đồ **S1 (1030,372)** (`search_a/b`, quay lưng nhìn lên-trái). Zone `library`, slot có `only:RESERVED` (`RESERVED=['eve','theo','oracle']` trong `idle.ts`). Fx mới `page` (giấy/bóng đèn bay) và `dust` (bụi + lấp lánh).
      - **Luật:** `IdleWorld.fits()` — slot `only` chỉ nhận đúng người và chỉ khi manifest có đủ pose (chưa có ảnh `read_*`/`search_*` thì góc tự tắt). Bình thường 3 người nghỉ ở Cafe/Relax như mọi người. **Khi kín chỗ:** người mới bấm đi nghỉ → `yieldSeat()` tìm Eve/Theo/Oracle đang ngồi ghế chung mà góc riêng còn trống → người đó nhả ghế ngay (`moveAside`), mờ đi sang góc riêng, người mới vào ghế vừa nhả. `hasRoom` tính cả khả năng nhường. Tới giờ đổi chỗ khi kín: E/T/O ở ghế chung thì về góc riêng thay vì tráo cặp; ở góc riêng thì ở lại (đổi sang góc riêng khác nếu trống) cho tới khi ghế chung có chỗ. Tráo cặp không kéo người ở góc riêng.
      - Thử (ảnh tạm alias chair_front/stand_brew): bấm cả 15 đi nghỉ → **15/15 nghỉ được**, E/T/O vào L1/S1/L2; 8 phút 0 trùng chỗ, sổ chỗ khớp, 0 lỗi. Ảnh tham chiếu `environment/library_reference.png`, `shelf_reference.png`; prompt mục **25**. Chờ anh gen 3 sheet `library_sheet.png`.
      - **Eve ĐÃ CÓ GÓC RIÊNG (22/10):** sheet `public/assets/eve/library_sheet.png` (1024×1536, 2×2, alpha thật) → slice → `search_a` nhãn dính bốt (cắt từ hàng 639). Sheet này **vẽ to hơn bộ idle ~1.5×** → resize 4 ảnh ×(425/632) cho cao bằng `stand_drink`, rồi thêm 4 pose vào `eve/idle/manifest.json` (cùng scale 0.2695; anchor = tâm hàng đáy). Soi L1/L2 (ghế bành da nâu) và S1: khớp, không cần chỉnh toạ độ. Thử bấm cả 15 đi nghỉ: Eve sang góc đọc sách, 13 người nghỉ, Theo/Oracle ở lại ghế (chưa có ảnh góc riêng); 0 trùng/0 lỗi. **Theo, Oracle: cùng cách, ảnh mới cũng nhớ resize về cỡ bộ idle.**
      - **Theo ĐÃ CÓ GÓC RIÊNG (22/10):** `public/assets/theo/library_sheet.png` (vẫn vẽ to ~1.5× dù đã dặn) → chỉ `read_a` dính nhãn (cắt từ hàng 637); resize ×0.681 cho `search_b` cao bằng `stand_drink`. ⚠ Anchor tự động của `read_*` rơi vào giày (Theo duỗi chân ra ngoài ghế) → ghế lệch so với Eve. **Quy tắc neo ghế bành: anchor = chân ghế trước-trái + (26 px, 0) màn hình** (theo Eve: chân trái (88,411) → anchor (185,412) ở scale 0.2695). Theo: read_a (183,425), read_b (181,420). Soi Eve + Theo ngồi cạnh nhau: 2 ghế cùng cỡ, cùng chỗ. Kín chỗ: 14/15 nghỉ (Eve L1, Theo L2), chỉ Oracle ở lại ghế.
      - **Oracle ĐÃ CÓ GÓC RIÊNG (22/10) → ĐỦ 3/3:** `public/assets/oracle/library_sheet.png`; `read_a` dính nhãn (cắt từ hàng 680); resize ×0.657 theo `stand_drink`; neo `read_*` theo luật chân ghế trước-trái + 26 px màn hình (tính tự động: dòng thấp nhất có pixel trái < 0.3W). Soi cạnh Eve/Theo: ghế trùng cỡ, trùng chỗ. **Bấm cả 15 đi nghỉ → 15/15 có chỗ** (E/T/O ở S1/L2/L1), 8 phút 0 trùng/0 lỗi.
    - **CHỖ NGẮM CẢNH đội REVIEW (anh chốt 22/10):** lan can kính dưới khu REVIEW (góc chậu cây) → slot **V1 (305,984)** (anh chỉnh: sát lan can, giữa 2 chậu cây, khuất sau lan can), `only:['sage','iris','juno','echo']`. **Lớp che lan can** `public/assets/environment/review_rail_fg.png` (cắt từ nền vùng x 240–400, y 890–1040, phần dưới mép trên thanh vịn y = 902.5 + 0.754·(x−250) − 2; thanh vịn/cột/cây/chậu/gờ đặc, kính alpha 80) đặt ở (240,890), `zIndex` 984.5 → đè lên chân nhân vật đứng V1, thấy chân mờ qua kính. `build-deploy.mjs` đã copy file này. `stand_drink` lật ngang (quay mặt xuống-trái ra thành phố), fx `view` (lấp lánh xa) / `sigh` ("ahh~"). Dùng ảnh sẵn có, không cần gen. Cùng luật góc riêng: kín chỗ thì reviewer nhường ghế chung ra đây.
    - **Cử động + FX góc riêng (22/10):** `animate()`: `read_*` thở chậm + gật nhẹ theo dòng chữ; `search_a` nhón chân lên xuống (2.5 px); `search_b` thở; V1 đung đưa theo gió (xoay ±0.018 rad quanh chân). FX: `page` = tờ giấy lật (particle `flipPage`, scale.x = cos) + icon suy nghĩ theo người (`READ_ICONS`: Eve sparkle/star/idea, Theo idea/note/check, Oracle check/cross/exclaim); `dust` = bụi rơi dày hơn khi với kệ, `search_b` thỉnh thoảng "!" + "found it!" + lấp lánh; `view` ở V1 = vệt gió trắng trôi qua, đèn thành phố lấp lánh nhiều màu phía trước, thỉnh thoảng sao băng + tim tím.
    - **EVE NGỦ TRƯA ở MERGE (anh chốt 22/10):** slot **M1 (1235,540)** giữa thảm xanh phát sáng trước bàn MERGE, `only:['eve']`, pose `sleep_a/b/c` (đổi 3–6 s = lăn qua lăn lại), fx `dream`: Zzz tím, bong bóng mơ (tim/sao/tick), thỉnh thoảng nói mớ ("mmh... merged~", "5 more min...", "zzz... LGTM"); đổi pose ngủ → nảy 3 px trong 450 ms + chữ "fuwa~" (`rollAt`); thở sâu (scale.y ±2.5%). Chỗ tự tắt tới khi có ảnh (prompt mục **26**, ảnh tham chiếu `environment/merge_nap_reference.png`, lưu `public/assets/eve/nap_sheet.png`).
      - **ĐÃ CHẠY (22/10):** sheet 2000×667, 3×1, alpha thật, slicer bỏ sẵn nhãn. Đo bề rộng đầu (hàng 20% từ đỉnh): nap ~330 px vs idle ~206 → resize ×0.62; thêm `sleep_a/b/c` vào `eve/idle/manifest.json`, **anchor = giữa bbox, đáy** (không dùng tâm hàng đáy vì đáy là chăn/bốt lệch). Trên màn hình ~100–118 × 88 px, nằm gọn trên thảm M1; soi 3 pose: gối gần như cùng chỗ, Zzz/bong bóng tim/nói mớ hiện đúng.
    - **EVE ĐI DẠO NHẢY CHÂN SÁO (anh chốt 22/10) — ngoại lệ duy nhất cho luật "không đi bộ":** slot **W1** (`only:['eve']`, `path` = lối đi trước dãy CODING dưới `[[590,742],[700,772],[850,765],[1000,745]]`, đi qua lại kiểu ping-pong; `needs` = walk_b/look/trip/down/peek/up). Slot có `path` → `choose()` gọi `startWalk`, `animate()` gọi `walkStep` (máy trạng thái): `skip` 45 px/s, đổi walk_a/b mỗi 180 ms + nảy 5 px, bụi chân + thỉnh thoảng nốt nhạc/lấp lánh; mỗi 3–5.5 s: 32% `look` (dừng 1.7 s, ngó trái-phải bằng lật ảnh, "?"), 13% `trip` ("waa!", lao tới trượt 350 ms) → `down` 1.1 s (bụi tung, 3 sao, "ouch...") → `peek` 1.4 s (ngó trái-phải, giọt nước mắt) → `up` 0.55 s ("hehe~") → đi tiếp. Lật theo hướng đi; `zIndex` = y hiện tại. ⚠ `dt` phải kẹp ≥ 0 (ticker thật + tua tay chạy song song từng làm Eve văng ra x = −3433). Thử bằng ảnh tạm: lộ trình đúng, đủ các trạng thái, 0 lỗi. Prompt mục **27**, ảnh tham chiếu `environment/eve_walk_reference.png`, lưu `public/assets/eve/walk_sheet.png`.
      - **ĐÃ CHẠY (22/10):** sheet 1536×1024 alpha thật, hàng 2 chỉ 3 hình và `down`/`peek` dính bốt nhau → `cellslice.mjs` (hàng 1 cắt 385/760/1118, hàng 2 cắt 455/826); `up` dính mẩu nhãn hàng trên ở đỉnh → xoá mảng < 3000 px trong 14 hàng đầu. Đầu to hơn bộ idle (~248 vs ~210 px ở hàng 20%) → resize ×0.85, thêm 7 pose vào `eve/idle/manifest.json`. Anchor: walk/look/up = tâm hàng đáy (giữa 2 chân); `trip` = giữa bbox, đáy + 30 (đang bay); `down/peek` = giữa bbox, đáy. Ảnh vẽ hướng sang phải → `flip` theo hướng đi đúng. Soi đủ chuỗi skip → look → trip ("waa!") → down ("ouch..." + sao) → peek → up ("hehe~"). 15 người × 15 phút: Eve dùng đủ M1/W1/L1/L2/S1 + ghế chung, 0 trùng/0 lỗi.
    - **TỰ ĐỘNG LÀM ↔ NGHỈ (anh chốt 22/10, cuối ngày):** `coding-test.ts` `updateShifts(now)` gọi mỗi khung: mỗi nhân vật luân phiên làm việc `WORK_SECONDS` 40–100 s rồi nghỉ `BREAK_SECONDS` 25–60 s (random). Lần đầu lệch ngẫu nhiên (0–100 s) để cả văn phòng không đi nghỉ cùng lúc. Hết chỗ nghỉ → ở lại ghế ("hết chỗ nghỉ"), thử lại sau 5–10 s; ghế làm việc bị chiếm → nghỉ tiếp, thử lại sau 5–10 s. Nút **"Tự động làm ↔ nghỉ: BẬT/TẮT"** trên thanh IDLE (mặc định BẬT). Đây là bản giả lập trên trang test thay cho `/api/state` (khi nối API thật thì bỏ `updateShifts`, dùng `agents[]`/`benchAgents[]`). Thử 10 phút: 158 lần chuyển, số người nghỉ dao động 1–11, 0 trùng (vừa làm vừa nghỉ), 0 biến mất, 0 lỗi.
    - **DEPLOY VERCEL 23/10:** máy Windows đã `npx vercel login` (tài khoản `tadoansr-9331`). `node scripts/build-deploy.mjs` → `dist-deploy/` ~92 MB → `cd dist-deploy && npx vercel deploy --prod --yes --name vibe-code-studio` → https://vibe-code-studio-zeta.vercel.app đã có bản idle đủ 15 nhân vật (góc riêng, Eve ngủ/đi dạo, tự động làm ↔ nghỉ); đã mở thử: tải 100%, 15 idlers, không lỗi console. Bản deploy từ commit `d08f60d`.
    - **`CORNER_CHANCE=0.2`** (`idle.ts`): mỗi lần chọn chỗ, người có góc riêng có 20% tự đi ra góc riêng dù phòng còn chỗ (để góc riêng không chỉ dùng lúc kín). Thử 15 người × 10 phút: V1 được Sage/Juno/Echo dùng, 0 người lạ vào góc riêng, 0 trùng, 0 lỗi.
    - **Sage (prompt mục 24h, 22/10):** reviewer đầu tiên làm idle; ảnh tham chiếu `sage/review/type_a` + `talk_left` có ghế review tím → prompt cấm vẽ ghế đó. Đồ: tách trà sứ + đĩa lót, sách bìa cứng, game logic, ấm trà nhỏ. Prompt từ đây cấm thêm **nền xám/đen** và **khói** (Atlas nền đen, Comet caro xám). Khi lắp: cần nối `ReviewSeat` (đang có tap riêng chọn reviewer) với `goIdle`.
    - ⚠ Trình duyệt trong app 2 lần treo khi `navigate` tải lại trang test → đóng tab, `preview_start`, rồi `location.href='/coding-test.html'` là chạy.
    - **Comet (prompt mục 24g, 22/10):** tinh nghịch, nghệ sĩ: soda nho ống hút xoắn cầu vồng, sổ vẽ + bút dạ, cốc hình hành tinh, game nhịp điệu, cốc mang đi vẽ mặt cười; mũ len luôn đội. Viết trong lúc Atlas còn chờ sheet.
    - **Atlas (prompt mục 24f, 22/10):** thân thiện, hay chia đồ ăn: hộp bento + sandwich, cốc giữ nhiệt trà nóng, cốc teal, game nông trại, túi bánh quy mời bạn. Từ Atlas prompt thêm dòng **cấm GPT vẽ "Zzz"/giọt mồ hôi/ký hiệu hiệu ứng** (Vega bị vẽ sẵn Zzz).
    - **Vega (prompt mục 24e, 22/10):** anh muốn **làm từng nhân vật một** (không viết prompt hàng loạt). Thứ tự: Lyra → Vega → Atlas → Comet → reviewer → Eve/Theo/Oracle/Sherlock. Oracle dùng ảnh `check_a` + `glare_a`, Sherlock `log_a` + `ponder_a` (KHÔNG dùng `talk`/`approve` của Sherlock — lẫn tóc Oracle).
    - **Thêm nhân vật tiếp:** gen sheet theo mục 24a (đổi nhân vật + đồ riêng) → lưu `public/assets/<ten>/idle_sheet.png` → cắt → manifest cùng cỡ (displayHeight ≈ 0.2697 × chiều cao bbox `sit_relax`) → thêm tên vào `IDLERS`.
  - **Tiếp:** gen sheet idle (prompt mục 24, đổi tên nhân vật + giữ ngoại hình) cho 14 nhân vật còn lại; nối trạng thái idle với `/api/state` (`benchAgents[]`).
- **ĐỦ 15 NHÂN VẬT trên trang test** (6 builder, 4 reviewer, Eve, Theo, Oracle, Pixel). Việc kế tiếp: (c) chuyển logic `coding-test.ts` vào scene runtime thật + nối `/api/state` theo bảng quy đổi role; dọn test/asset cũ (office-occlusion test fail).
- **Việc kế tiếp:** (a) ~~cắt Juno + Echo~~ xong; tiếp theo → cắt → manifest theo cỡ ghế → thêm vào `REVIEWERS`, cắt + manifest khu review, ghép R1–R4, rồi Iris/Juno/Echo, rồi gen sheet 4 reviewer (16b), thêm tham số khu cho `build-coding-manifest.mjs`, **đo toạ độ R1–R4 mới** ở lối đi rộng khi lắp sprite; (b) merge (Eve), dispatcher (Captain), sofa idle; (c) chuyển logic `coding-test.ts` vào scene runtime thật + nối `/api/state`.
- Prompt ChatGPT: `VIBE_CODE_STUDIO_ANIMATION_PROMPTS.md` (mục 13 = mẫu re-skin chuẩn, mục 14–15 = mẫu prompt độc lập, mục 16 = khu review).
- Máy hiện tại: **macOS**, Node v26.5.0 → dùng `npm run dev` (không cần `npm.cmd`).

### 0a. CHUYỂN MÁY (cập nhật 22/10 — dùng mục này, mục 0b bên dưới là bản Windows cũ)

1. `git clone https://github.com/ocanhdt12-gif/agent2d.git` → `cd agent2d` → `npm install` (Node 24+).
2. `npm run dev` → mở **http://localhost:5173/coding-test.html** (trang chính hiện tại: 15 nhân vật + idle). Windows PowerShell: dùng `npm.cmd`.
3. Mở Claude Code trong thư mục, nhắn: *"Đọc `VIBE_CODE_STUDIO_CONTEXT_2026-10-21.md` và `VIBE_CODE_STUDIO_ANIMATION_PROMPTS.md`, làm tiếp từ mục IDLE."*
4. Không nằm trong repo (phải làm lại trên máy mới): `.claude/launch.json` (preview `vite-dev` cổng 5173, `deploy-preview` cổng 5180), đăng nhập `gh auth login` và `npx vercel login`, các script cắt sheet tạm ở thư mục nháp (cách làm đã ghi trong context: cắt nhãn sprite đứng, khối nhãn độ rộng không đổi, despeck, cắt lưới `SPLIT`).
5. Deploy lại: `node scripts/build-deploy.mjs` → `cd dist-deploy && npx vercel deploy --prod --yes --name vibe-code-studio` (link https://vibe-code-studio-zeta.vercel.app — bản trên Vercel CHƯA có idle).
6. **Đang dở:** idle mới làm cho Pixel; tiếp theo gen sheet idle (prompt mục 24) cho 14 nhân vật còn lại, rồi chuyển `coding-test.ts` vào scene thật + nối `/api/state` theo bảng quy đổi role.



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
