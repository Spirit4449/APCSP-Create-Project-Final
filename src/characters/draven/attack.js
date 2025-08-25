function handlePointerDown() {
    const p = this.player;
    const {
      getAmmoCooldownMs,
      tryConsume,
      setCanAttack,
      setIsAttacking,
      drawAmmoBar,
    } = this.ammo;

    if (!tryConsume()) return;
    setIsAttacking(true);
    setCanAttack(false);


    // Re-enable attack once per-shot cooldown elapses
    const cooldown = getAmmoCooldownMs();
    this.scene.time.delayedCall(cooldown, () => setCanAttack(true));

    setTimeout(() => setIsAttacking(false), 250);

    drawAmmoBar();

    // Broadcast to others to render the effect
    socket.emit("attack", {
      name: this.username,
      type: `${NAME}-slash`,
      direction,
      range,
      duration,
    });
  }