import React, { useMemo, useState } from "react"
import { StyleSheet, Text, View, Pressable, Button, TouchableHighlight } from "react-native"

export default function RootLayout() {
  const [valor, setValor] = useState("0") 
  const [valorAnterior, setValorAnterior] = useState<number | null>(null)
  const [operacao, setOperacao] = useState<"+" | "-" | "x" | "/" | null>(null)
  const [novoNumero, setNovoNumero] = useState(true)

  
  const valorParaNum = (s: string) => {
    const troca = s.replace(",", ".")
    const n = Number(troca)
    return Number.isFinite(n) ? n : 0
  }

  const numParaValor = (n: number) => {
    if (!Number.isFinite(n)) return "Erro"
    const fixed = Number(n.toFixed(10))
    return String(fixed).replace(".", ",")
  }

  const inserirDigito = (d: string) => {
    if (valor === "Erro") setValor("0")

    if (novoNumero) {
      setValor(d === "0" ? "0" : d)
      setNovoNumero(false)
      return
    }

    if (valor === "0" && d !== ",") {
      setValor(d)
      return
    }

    setValor((prev) => prev + d)
  }

  const inserirVirgula = () => {
    if (valor === "Erro") {
      setValor("0,")
      setNovoNumero(false)
      return
    }

    if (novoNumero) {
      setValor("0,")
      setNovoNumero(false)
      return
    }

    if (valor.includes(",")) return
    setValor((prev) => prev + ",")
  }

  const limparTudo = () => {
    setValor("0")
    setValorAnterior(null)
    setOperacao(null)
    setNovoNumero(true)
  }

  const apagarUltimo = () => {
    if (valor === "Erro") {
      limparTudo()
      return
    }

    if (novoNumero) return

    setValor((prev) => {
      if (prev.length <= 1) {
        setNovoNumero(true)
        return "0"
      }
      const next = prev.slice(0, -1)
      if (next === "-" || next === "") {
        setNovoNumero(true)
        return "0"
      }
      return next
    })
  }

  const escolherOperacao = (op: "+" | "-" | "x" | "/") => {
    if (valor === "Erro") return

    const atual = valorParaNum(valor)

    if (valorAnterior !== null && operacao !== null && novoNumero) {
      setOperacao(op)
      return
    }

    if (valorAnterior !== null && operacao !== null && !novoNumero) {
      const resultado = calcular(valorAnterior, atual, operacao)
      if (resultado === null) {
        setValor("Erro")
        setValorAnterior(null)
        setOperacao(null)
        setNovoNumero(true)
        return
      }
      setValor(numParaValor(resultado))
      setValorAnterior(resultado)
      setOperacao(op)
      setNovoNumero(true)
      return
    }

    setValorAnterior(atual)
    setOperacao(op)
    setNovoNumero(true)
  }

  const calcular = (a: number, b: number, op: "+" | "-" | "x" | "/") => {
    switch (op) {
      case "+":
        return a + b
      case "-":
        return a - b
      case "x":
        return a * b
      case "/":
        if (b === 0) return null
        return a / b
      default:
        return null
    }
  }

  const igual = () => {
    if (valor === "Erro") return
    if (valorAnterior === null || operacao === null) return

    const atual = valorParaNum(valor)

    const resultado = calcular(valorAnterior, atual, operacao)
    if (resultado === null) {
      setValor("Erro")
      setValorAnterior(null)
      setOperacao(null)
      setNovoNumero(true)
      return
    }

    setValor(numParaValor(resultado))
    setValorAnterior(null)
    setOperacao(null)
    setNovoNumero(true)
  }

  return (
    <>
    <Text style={styles.aviso}>*Pressione botão "C" para resetar o cálculo e "B" para apagar o último número inserido</Text>
    <View style={styles.calculadora}>
      <View style={styles.visor}>
        <Text style={styles.textovalor} numberOfLines={1}>
          {valor}
        </Text>
      </View>

      <View style={styles.fileira}>
        <TouchableHighlight onPress={() => inserirDigito("1")}>
          <View style={styles.botao}> 1 </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => inserirDigito("2")}>
          <View style={styles.botao}> 2 </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => inserirDigito("3")}>
          <View style={styles.botao}> 3 </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => escolherOperacao("/")}>
          <View style={styles.botao}> / </View>
        </TouchableHighlight>
      </View>

      <View style={styles.fileira2}>
        <TouchableHighlight onPress={() => inserirDigito("4")}>
          <View style={styles.botao}> 4 </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => inserirDigito("5")}>
          <View style={styles.botao}> 5 </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => inserirDigito("6")}>
          <View style={styles.botao}> 6 </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => escolherOperacao("x")}>
          <View style={styles.botao}> x </View>
        </TouchableHighlight>
      </View>

      <View style={styles.fileira2}><TouchableHighlight onPress={() => inserirDigito("7")}>
          <View style={styles.botao}> 7 </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => inserirDigito("8")}>
          <View style={styles.botao}> 8 </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => inserirDigito("9")}>
          <View style={styles.botao}> 9 </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => escolherOperacao("-")}>
          <View style={styles.botao}> - </View>
        </TouchableHighlight>
      </View>

      <View style={styles.fileira2}>
        <TouchableHighlight onPress={() => inserirDigito("0")}>
          <View style={styles.botao}> 0 </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={inserirVirgula}>
          <View style={styles.botao}> , </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => escolherOperacao("+")}>
          <View style={styles.botao}> + </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={igual}>
          <View style={styles.botao}> = </View>
        </TouchableHighlight>
      </View>

      <View style={styles.fileira2}>
        <TouchableHighlight onPress={limparTudo}>
          <View style={styles.botao}> C </View>
        </TouchableHighlight>

        <Text style={styles.vazio}> </Text>

        <TouchableHighlight onPress={apagarUltimo}>
          <View style={styles.botao}> B </View>
        </TouchableHighlight>
      </View>

      <View style={styles.perninha}></View>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  aviso:{
    fontSize: 20,
    fontWeight: 900
  },

  calculadora: {
    backgroundColor: "#FE3867",
    height: 600,
    width: 370,
    margin: 8,
    borderRadius: 30,
    paddingBottom: 10,
  },

  visor: {
    backgroundColor: "#B3EBF2",
    margin: 30,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    paddingHorizontal: 18,
  },

  textovalor: {
    fontSize: 32,
    textAlign: "right",
    color: "black",
    fontWeight: "600",
  },

  botao: {
    backgroundColor: "black",
    color: "white",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 18,
    margin: 8,
    minWidth: 60,
    alignItems: "center",
    justifyContent: "center",
  },

  fileira: {
    flexDirection: "row",
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center"
  },

  fileira2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  vazio: {
    width: 150,
    borderRadius: 30,
  },

  perninha: {
    backgroundColor: "white",
    padding: 40,
    marginHorizontal: 130,
    height: 170,
    borderRadius: 20
  }
})