-- This migration handles both TEXT and existing ENUM variants safely.

-- 0) If the column is an ENUM without the new values, first broaden it to a superset.
--    This avoids errors when setting values not present in the current ENUM.
--    Note: This statement is safe even if status is TEXT or already includes these values.
ALTER TABLE parties MODIFY COLUMN status ENUM(
   'queued','live','completed','cancelled', -- legacy enum values (if any)
   'idle','ready_check',                    -- new values to allow updates
   'matchmaking','searching'                -- legacy text states we may normalize from
) NULL;

-- 1) Normalize unexpected/legacy/null to an allowed value
UPDATE parties SET status = 'idle'
WHERE status IS NULL
    OR status IN ('open','canceled','', 'complete', 'completed')
    OR status NOT IN ('idle','queued','ready_check','live','completed','cancelled');

-- 2) Map legacy searching states
UPDATE parties SET status = 'queued' WHERE status IN ('matchmaking','searching');

-- 3) Ensure ready_check stays as-is (no-op if already correct)
UPDATE parties SET status = 'ready_check' WHERE status = 'ready_check';

-- 4) Map live/in_match aliases
UPDATE parties SET status = 'live' WHERE status IN ('in_match','live');

-- 5) Constrain column to final ENUM and enforce default
ALTER TABLE parties MODIFY COLUMN status ENUM('idle','queued','ready_check','live') NOT NULL DEFAULT 'idle';

-- Verify
SELECT status, COUNT(*) AS cnt FROM parties GROUP BY status;
